# GraphIQl

##Periods

### List
```
{
  periods {
    id
    year
    month
    archivedAt    
    operations {
      dt
      label
      amount
    }
  }
} 
```

### Add 
```
mutation addPeriod($year: Int, $month: Int) {
  addPeriod(month: $month, year: $year) {
    id
    month
    year
  }
}
```

```
{
  "month": 12,
  "year": 2017
}
```

##Operations

### Add
```
mutation addOperation($periodId: ID, $label: String, $amount: Float, $dt: String) {
  addOperation(periodId: $periodId, label: $label, amount: $amount, dt: $dt) {
    id
    year
    month
    operations {
      id
      label
      amount
      dt
    }
  }
}
```

```
{
  "amount": 35.22,
  "dt": "2017-12-20",
  "label": "Test 2",
  "periodId": "5a1551bf8129775aa3b98dec"
}
```
