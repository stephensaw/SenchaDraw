# SenchaDraw

Simple project for creating a very simple Draw Something kind of apps using Sencha Touch 2

### Project Setup

- Run on Sencha Touch 2.0.1.1 (haven't test on newer version)
- Cannot run in localhost due to cross domain problem, can be run using IP address for localhost
- Database name "**SenchaDraw**" with a table "**Drawing**":
 
| Column    | DataType      |
|-----------|:-------------:|
| id        | int(auto)     |
| userid    | int           |
| echoes    | longtext      |

### Browsers Tested

- Google Chrome 29.0.1547.65 on OS X 10.8
- Safari 6.0.5 on OS X 10.8
