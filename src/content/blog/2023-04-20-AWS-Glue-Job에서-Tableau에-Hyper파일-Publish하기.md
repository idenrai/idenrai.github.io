---
title: "AWS Glue Job에서 Tableau에 Hyper파일 Publish하기"
date: 2023-04-20
tags: ["Tech", "AWS for Data Engineering", "Python", "tableau", "Glue", "Jobs", "aws", "Hyper"]
tistory_url: "https://idenrai.tistory.com/272"
---

# 개요

Glue Jobs에서 Tableau로 데이터 연계 방법을 검증

# 상세

AWS Glue Jobs에서 S3의 엑셀 파일을 불러와 Tableau의 데이터 타입인 Hyper로 바꿔서 Tableau에 Publish해 보았다. 위의 내용을 3개의 파트로 나누어 검증.

-   S3의 엑셀 파일을 Pandas DataFrame으로 받아오기
-   PandasDF로 Hyper파일 만들기
-   Hyper파일을 Tableau Server에 보내기

## 외부 라이브러리 Import

Glue Job에서는 외부 라이브러리를 사용할 경우 아래와 같이 설정해야 한다. 같은 Glue Job이라도 notebook과 script로 대응 방법이 갈리니 주의.

[AWS Glue와 함께 Python 라이브러리 사용](https://docs.aws.amazon.com/ko_kr/glue/latest/dg/aws-glue-programming-python-libraries.html)

Notebook

```
%additional_python_modules awswrangler,tableauhyperapi,tableauserverclient
```

Script

```
--additional-python-modules awswrangler,tableauhyperapi,tableauserverclient
```

## S3의 엑셀 파일을 Pandas DataFrame으로 받아오기

이건 솔직히 검증할 것도 없다. 그냥 [awswrangler](https://pypi.org/project/awswrangler/) 로 해결됨.

```
import awswrangler as wr
import pandas as pd

# S3 버킷 및 파일 키 설정
s3_bucket = "bucket_name"
s3_key = "excel_file_name.xlsx"

# S3에서 엑셀 파일 읽기
s3_path = f"s3://{s3_bucket}/{s3_key}"
sheets_dict = wr.s3.read_excel(s3_path, sheet_name=None)

# 모든 시트를 따 왔으니, 아래의 for문으로 돌리면 됨
for sheet_name, pandas_df in sheets_dict.items():
    print(sheet_name)
    print(pandas_df)
```

## PandasDF로 Hyper파일 만들기

여기부터 조금 짜증나기 시작. 일단 방법은 크게 두가지 존재.

-   [Tableau Hyper API (공식)](https://help.tableau.com/current/api/hyper_api/en-us/index.html)
-   [pantab](https://github.com/innobi/pantab)

pantab 쪽이 쓰긴 편할 것 같은데, 아직 star가 100도 안되는 미성숙한(?) 녀석이라 불안정할 것이 우려됨. 결국 그냥 Tableau 공식인 Tableau Hyper API를 쓰기로 했다. 보안 관계상, 여기는 더미 데이터프레임을 사용.

```
from tableauhyperapi import HyperProcess, Telemetry, TableDefinition, Inserter, HyperException, CreateMode, SqlType, Connection

# 예제 데이터프레임 생성
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'gender': ['F', 'M', 'M'],
})

# 일단 함수를 만든다
# 스키마 정의는 따로 설명하기 귀찮으니 그냥 여기선 함수 내에 적도록 한다
def pandas_df_to_hyper(pandas_df, hyper_file_path, table_name):
    # Hyper 파일의 스키마 정의
    table_definition = TableDefinition(
        table_name=table_name,
        columns=[
            TableDefinition.Column(name='name', type=SqlType.text()),
            TableDefinition.Column(name='age', type=SqlType.double()),
            TableDefinition.Column(name='gender', type=SqlType.text()),
        ]
    )

    # Hyper 파일에 데이터 삽입
    with HyperProcess(telemetry=Telemetry.DO_NOT_SEND_USAGE_DATA_TO_TABLEAU) as hyper:
        with Connection(hyper.endpoint, f"{table_name}.hyper", CreateMode.CREATE_AND_REPLACE) as connection:
            connection.catalog.create_table(table_definition)
            with Inserter(connection, table_definition) as inserter:
                for row in pandas_df.itertuples(index=False):
                    # 데이터프레임의 칼럼과 Hyper 파일의 스키마가 다를 경우
                    new_row = (getattr(row, 'name'), getattr(row, 'age'), getattr(row, 'gender'))
                    inserter.add_row(new_row)
                inserter.execute()

# 데이터프레임을 Tableau Hyper 파일로 변환
table_name = 'my_table'
hyper_file_path = f"s3://{s3_bucket}/test.hyper"
hyper_file_local_path = f"./{table_name}.hyper"

# pandas to hyper
pandas_df_to_hyper(df, hyper_file_path, table_name)

# 일단 만든거 확인은 해야 하니, Hyper file을 일단 S3로 보내 봄
wr.s3.upload(local_file=hyper_file_local_path, path=hyper_file_path)
```

## Hyper파일을 Tableau Server에 보내기

위에서 만든 Hyper파일을 그대로 Tableau Server에 보내도록 한다. 이건 [Tableau Server Client (TSC)](https://tableau.github.io/server-client-python/docs/)를 사용.

```
import tableauserverclient as TSC

# 여기도 일단 함수 만들기
def tableau_publish_hyper_file(path, datasource_name):
    # Tableau Info
    tableau_server_address = 'https://mytableauserver.com/'  # Tableau Server 주소
    tableau_site_id = 'mysiteid'  # Tableau Site ID
    tableau_username = 'username'  # Tableau 사용자 이름
    tableau_password = 'password'  # Tableau 사용자 비밀번호
    project_id = 'project_id'

    # Create a server object and log in to Tableau Server
    server = TSC.Server(tableau_server_address)
    tableau_auth = TSC.TableauAuth(tableau_username, tableau_password, site_id=tableau_site_id)
    server.auth.sign_in(tableau_auth)

    # Publish the hyper file to the server
    new_datasource = TSC.DatasourceItem(project_id)
    new_datasource.name = datasource_name
    new_datasource = server.datasources.publish(new_datasource, path, 'CreateNew')
    print("Hyper file uploaded to Tableau Server: ", new_datasource.id)

# 위에서 만든 Hyper파일을 그대로 사용
tableau_publish_hyper_file(hyper_file_local_path, "test")
```

여기서 중요한게, Tableau의 project\_id라는 것이 필요하다. 근데 이게 적어도 내가 갖고 있는 Tableau Server에서는 볼 수가 없다. 그래서 로컬 환경에서 아래와 같은 방식으로 프로젝트를 특정하여 project\_id를 확인하고, 그걸 위의 project\_id에 삽입.

```
import tableauserverclient as TSC

def tableau_get_project_id():
    # Tableau Info
    tableau_server_address = 'https://mytableauserver.com/'  # Tableau Server 주소
    tableau_site_id = 'mysiteid'  # Tableau Site ID
    tableau_username = 'username'  # Tableau 사용자 이름
    tableau_password = 'password'  # Tableau 사용자 비밀번호
    tableau_project_name = 'Default'  # Tableau 프로젝트 이름

    # Create a server object and log in to Tableau Server
    server = TSC.Server(tableau_server_address)
    tableau_auth = TSC.TableauAuth(tableau_username, tableau_password, site_id=tableau_site_id)
    server.auth.sign_in(tableau_auth)

    # Get the project ID using the project name
    all_projects, pagination_item = server.projects.get()
    project = next((p for p in all_projects if p.name == tableau_project_name), None)
    if project is None:
        print(f"Could not find project '{tableau_project_name}' on Tableau Server.")
        return

    print(project)

tableau_get_project_id()
```

위의 아웃풋은 대충 이런 느낌으로 나온다.

여하튼 이렇게 하면 Tableau Server의 해당 Site의 해당 Project에 Hyper파일이 Publish된다.
