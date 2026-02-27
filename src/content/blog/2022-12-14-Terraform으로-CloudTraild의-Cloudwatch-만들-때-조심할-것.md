---
title: "Terraform으로 CloudTraild의 Cloudwatch 만들 때 조심할 것"
date: 2022-12-14
tags: ["Tech", "AWS for Data Engineering", "cloudWatch", "terraform", "LogStream"]
tistory_url: "https://idenrai.tistory.com/270"
---

[https://docs.aws.amazon.com/ko\_kr/awscloudtrail/latest/userguide/cloudwatch-log-group-log-stream-naming-for-cloudtrail.html](https://docs.aws.amazon.com/ko_kr/awscloudtrail/latest/userguide/cloudwatch-log-group-log-stream-naming-for-cloudtrail.html)

[

CloudTrail에 대한 CloudWatch 로그 그룹 및 로그 스트림 이름 지정 - AWS CloudTrail

CloudTrail 로그 볼륨이 큰 경우 로그 데이터를 로그 그룹에 전달할 수 있도록 여러 개의 로그 스트림을 만들 수 있습니다.

docs.aws.amazon.com

](https://docs.aws.amazon.com/ko_kr/awscloudtrail/latest/userguide/cloudwatch-log-group-log-stream-naming-for-cloudtrail.html)

[https://stackoverflow.com/questions/64879420/terraform-aws-cloudtrail-configurations-fails](https://stackoverflow.com/questions/64879420/terraform-aws-cloudtrail-configurations-fails)

[

Terraform AWS CloudTrail configurations fails

I'm trying to configure AWS CloudTrail using terraform, but still failing on CloudWatch integration. Does anybody see a mistake somewhere? Terraform CLI and Terraform AWS Provider Version Terraform...

stackoverflow.com

](https://stackoverflow.com/questions/64879420/terraform-aws-cloudtrail-configurations-fails)

Cloudwatch LogStream은 이름 형식이 지정되어 있다.

이름 이거 안맞추면 계속 InvalidCloudWatchLogsLogGroupArnException 뜸...
