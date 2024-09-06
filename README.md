# API Contract SIMS PPOB

## Folder Structure

```plaintext
/
├── img/                    # Contain image asset for this readme
├── scripts/                # Contains SQL queries (DDL, DML and Triggers)
├── src/                    # Main directory of app
│   ├── controllers/
│   ├── dto/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── requests/
│   ├── routers/
│   ├── service/
│   ├── uploads/
│   ├── utils/
│   └── index.ts
├── .dockerignore
├── .env
├── .env.example
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── Dockerfile
├── package.json
├── README.md
├── tsconfig.json
```

## ERD and Database for Library API
### Tables

#### users
| Column     | Type   | Constraints    |
|------------|--------|----------------|
| id         | PK     |                |
| email      | String |                |
| password   | String |                |
| created_at | Date   |                |
| updated_at | Date   |                |
| deleted_at | Date   | (nullable)     |

#### memberships
| Column      | Type   | Constraints    |
|-------------|--------|----------------|
| id          | PK     |                |
| user_id     | FK     | references users(id) |
| first_name  | String |                |
| last_name   | String |                |
| balance     | Decimal|                |
| profile_image | String |             |
| created_at  | Date   |                |
| updated_at  | Date   |                |
| deleted_at  | Date   | (nullable)     |

#### banners
| Column     | Type   | Constraints    |
|------------|--------|----------------|
| id         | PK     |                |
| name       | String |                |
| image      | String |                |
| description| String |                |
| created_at | Date   |                |
| updated_at | Date   |                |

#### transactions
| Column         | Type    | Constraints    |
|----------------|---------|----------------|
| id             | PK      |                |
| invoice_number | String  |                |
| membership_id  | FK      | references memberships(id) |
| service_code   | FK      | references services(code) |
| type           | String  |                |
| amount         | Decimal |                |
| qty            | Integer |                |
| created_at     | Date    |                |
| updated_at     | Date    |                |

#### services
| Column     | Type   | Constraints    |
|------------|--------|----------------|
| code       | PK     |                |
| name       | String |                |
| icon       | String |                |
| tariff     | Decimal|                |
| created_at | Date   |                |
| updated_at | Date   |                |
| deleted_at | Date   | (nullable)     |

### ERD
![Diagram of ERD](https://raw.githubusercontent.com/taufiq30s/SIMS_PPOB/master/img/Nutech_SIMS_PPOB.png)
