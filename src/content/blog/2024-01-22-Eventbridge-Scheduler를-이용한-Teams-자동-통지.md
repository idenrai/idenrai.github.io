---
title: "Eventbridge Scheduler를 이용한 Teams 자동 통지"
date: 2024-01-22
tags: ["Tech", "AWS for Data Engineering", "Scheduler", "lambda", "terraform", "EventBridge"]
tistory_url: "https://idenrai.tistory.com/283"
---

## 개요

Eventbridge Scheduler를 이용해 Lambda를 정기적으로 기동, Teams에 Adaptive Card 형식으로 자동 통지를 구현

## 상세

### 폴더 구조

python과 terraform으로 폴더를 나눔.

```
.
├── README.md
├── python
│   ├── layer
│   │   └── python
│   └── main.py
└── terraform
    └── main.tf
```

혹시 관리하는 aws 환경이 여러개라면, terraform 폴더 아래에 dev, prod 등의 폴더를 나누고 그 안에서 `terraform init` 을 할 것.

### Lambda

[pymsteams](https://pypi.org/project/pymsteams/) 에서 adaptive card 를 이용하여, Teams 에 byname 으로 멘션 통지.

```
import pymsteams
from typing import Dict

TEAMS_WEB_HOOK = "https://company.webhook.office.com/webhook/12345678..."

# 담당자
handlers: Dict[str, str] = {
    "Kim": "kim@company.com",
    "Lee": "lee@company.com",
    "Ryu": "ryu@company.com",
}

# 메시지 작성
def create_message():
    mentions = ", ".join(["" + name + " 님" for name in handlers.keys()])
    entities = [
        {
            "type": "mention",
            "text": f"{name}",
            "mentioned": {"id": email, "name": name},
        }
        for name, email in handlers.items()
    ]

    # 텍스트
    text = ""
    text += f"{mentions} \n"
    text += "각 담당자는 XXX 정기 운용 보고서를 제출할 필요가 있습니다.\n"
    text += "이하 페이지를 참조하여 운용 보고서를 제출해 주세요.\n"
    text += "[운용 보고서 제출 양식](https://company.atlassian.net/wiki/spaces/123456/report)"
    text = text.replace("\n", "\n \n")

    # payload 작성 및 멘션 연계
    payload = {
        "type": "message",
        "attachments": [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": {
                    "type": "AdaptiveCard",
                    "body": [
                        {
                            "type": "TextBlock",
                            "isMultiline": "true",
                            "size": "small",
                            "text": text,
                        },
                    ],
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "version": "1.0",
                    "msteams": {
                        "width": "Full",
                        "entities": entities,
                    },
                },
            }
        ],
    }

    return payload

def send_notice(title, payload):
    myTeamsMessage = pymsteams.connectorcard(TEAMS_WEB_HOOK)
    myTeamsMessage.title(title)
    myTeamsMessage.payload = payload
    myTeamsMessage.send()

def lambda_handler(event, content):
    TITLE = "정기 운용 보고서 제출 의뢰"

    payload = create_message()
    send_notice(TITLE, payload)

# For local test
# lambda_handler(event="", content="")
```

### Terraform

기본적으로는 아래와 같은 느낌. Terraform의 [Eventbridge Module](https://registry.terraform.io/modules/terraform-aws-modules/eventbridge/aws/latest) 을 사용.

```
terraform {
  required_version = "~> 1.3.0"
  backend "s3" {
    bucket  = "terraform-tfstate-bucket"
    region  = "ap-northeast-1"
    key     = "project_name/terraform.tfstate"
    encrypt = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  default_tags {
    tags = {
      Owner = "Dept"
      Environment = "dev"
      Terraform = "true"
      Project   = "PJT-123"
    }
  }
}

data "aws_caller_identity" "current" {}

# IAM
resource "aws_iam_role" "report_alert" {
    name = "eventbridge-scheduler-role"
    assume_role_policy = data.aws_iam_policy_document.report_alert_assume_policy.json
    inline_policy {
      name = "eventbridge-scheduler-role-inline-policy"
      policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
          {
            Action = [
              "lambda:InvokeFunction",
            ]
            Effect = "Allow"
            Resource = "*"
          },
        ]
      })
    }
}

data "aws_iam_policy_document" "report_alert_assume_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["scheduler.amazonaws.com"]
    }
  }
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

# Lambda
module "lambda_function" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "4.12.1"

  function_name = "report_alert"
  description   = "Report Alert for each dept"
  handler       = "main.lambda_handler"
  runtime       = "python3.11"
  create_role   = false
  lambda_role   = report_alert.arn

  source_path   = "../../python/main.py"
  layers = [
    module.lambda_layer_local.lambda_layer_arn,
  ]
  timeout = 100
}

module "lambda_layer_local" {
  source = "terraform-aws-modules/lambda/aws"

  create_layer = true

  layer_name          = "lambda-layer-pymsteams"
  description         = "Layer for pymsteams"
  compatible_runtimes = ["python3.11"]

  source_path = "../../python/layer"
}

# Eventbridge Scheduler
resource "aws_scheduler_schedule" "report-alert" {
  name       = "report-alert"
  group_name = "default"

  flexible_time_window {
    mode = "OFF"
  }

  # 매주 월요일 10시
  schedule_expression = "cron(0 10 ? * MON *)"

  schedule_expression_timezone = "Asia/Tokyo"

  target {
    arn      = module.lambda_function.lambda_function_arn
    role_arn = aws_iam_role.report_alert.arn
  }
}
```

#### for\_each 를 사용하는 방법

일정이 비정기적이어서 cron식만으로는 해결하기 힘든 경우에는 for\_each 를 사용한다. 위의 테라폼 코드에 필요한 일시를 map으로 추가하고, `Eventbridge Scheduler` 에서 for\_each 를 사용하면 됨.

아래의 예시는 2026년 연말까지의 매 분기 첫번째 영업일에 통지를 하는 경우.

```
variable "alert_datetime" {
  type = map(string)
  default = {
    "2024_1" = "0 9 5 1 ? 2024" // 2024.01.05 09:00
    "2024_2" = "0 9 1 4 ? 2024" // 2024.04.01 09:00
    "2024_3" = "0 9 1 7 ? 2024" // 2024.07.01 09:00
    "2025_4" = "0 9 1 10 ? 2024" // 2024.10.01 09:00
    "2025_1" = "0 9 6 1 ? 2025" // 2025.01.06 09:00
    "2025_2" = "0 9 1 4 ? 2025" // 2025.04.01 09:00
    "2025_3" = "0 9 1 7 ? 2025" // 2025.07.01 09:00
    "2025_4" = "0 9 1 10 ? 2025" // 2025.10.01 09:00
    "2026_1" = "0 9 5 1 ? 2026" // 2026.01.05 09:00
    "2026_2" = "0 9 1 4 ? 2026" // 2026.04.01 09:00
    "2026_3" = "0 9 1 7 ? 2026" // 2026.07.01 09:00
    "2026_4" = "0 9 1 10 ? 2026" // 2026.10.01 09:00
  }
}

# Eventbridge Scheduler
resource "aws_scheduler_schedule" "report-alert" {
  name       = "report-alert-${each.key}"
  group_name = "default"

  flexible_time_window {
    mode = "OFF"
  }

  // 매 분기 첫번째 영업일
  for_each = var.alert_datetime

  schedule_expression = "cron(${each.value})"
  schedule_expression_timezone = "Asia/Tokyo"

  target {
    arn      = module.lambda_function.lambda_function_arn
    role_arn = aws_iam_role.report_alert.arn
  }
}
```

### 그외 준비할 것

#### Lambda Module 추가

레이어를 사용하므로, 추가 모듈이 있는 경우엔 아래와 같이 `./python/layer/python` 폴더에 추가 필요.

```
pip install [모듈명] -t ./python/layer/python
```

#### tfstate 저장용 S3 Bucket

본 샘플의 경우, `terraform-tfstate-bucket` 에 tfstate 를 저장하므로, 해당 환경에 이 버켓을 만들어 두어야 함.
