## Passwords source
Top-100 and top-100000 lists were taken from [SecLists](https://github.com/danielmiessler/SecLists)
## Generation
There are 8% of top-100 passwords, 3% of really random passwords, 60% from top-100000 and 19% of combined passwords.
Combined passwords consist of:
- 10% passwords from top-100 with '1' instead of 'a' and '123' instead of 'z',
- 30% passwords from top-100 + digit + symbol,
- 60% passwords from digit + top-100000 + 3 digits.
## Hasher
All passwords were hashed using md5 and sha1 algorythms and stored in csv files.