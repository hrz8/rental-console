# Console application for Renting a Car

## Quick Start

### Reuirements

```bash
MongoDB >= v4.2.3
```

### Usage

``` bash
# Install required dependencies
$ npm install
```

``` bash
# Insert cars data to database
$ node rental create_car BB-3421 white
$ node rental create_car CC-7891 blue
$ node rental create_car DD-4564 silver
$ node rental create_car DC-2678 black
```

``` bash
# Checking availability to all cars based on date
$ node rental status 2020-03-16

# Output
# RegistrationNumber  Color   Status  Customer
# ------------------  ------  ------  --------
# BB-3421             white   Free
# CC-7891             blue    Free
# DD-4564             silver  Free
# DC-2678             black   Free
```

``` bash
# Create new reservation for specified car on specified date
$ node rental reserve BB-3421 Budi 2020-05-01
```

``` bash
# Checking availability to all cars based on date (again, after reservation)
$ node rental status 2020-03-01

# Output
# RegistrationNumber  Color   Status  Customer
# ------------------  ------  ------  --------
# BB-3421             white   Rented  Budi
# CC-7891             blue    Free
# DD-4564             silver  Free
# DC-2678             black   Free
```

``` bash
# Reserve the reserved car
$ node rental reserve BB-3421 Budi 2020-05-01

# Output
# Already reserved
```

## App Info

### Authors

Hirzi Nurfakhrian

### Version

1.0.0
