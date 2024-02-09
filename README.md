## Create new expense
### Creates a new expense record. "notes" are optional
POST http://localhost:8888/api/v1/expenses/
```
{
    "name": "Food",
    "amount": 10.23,
    "notes": "Very good food",
    "createdAt": "2024-01-02T10:20:30"
}
```

## Get all expenses
### Retrieves a list of all expenses
GET http://localhost:8888/api/v1/expenses/

## Update expense
### Updates a single expense
PATCH http://localhost:8888/api/v1/expenses/:id

## Delete expense
### Deletes a single expense
DELETE http://localhost:8888/api/v1/expenses/:id

## Get expenses between specified dates
### Gets a list of expenses between dates
POST http://localhost:8888/api/v1/expenses/get-over-period
```
{
    "from": "2024-01-01",
    "to": "2024-04-04"
}
```

## Get sum of expenses between specified dates
### Gets a sum of all expenses amount between dates
POST http://localhost:8888/api/v1/expenses/sum-over-period
```
{
    "from": "2024-01-01",
    "to": "2024-04-04"
}
```
