# ==============================
# Task 1: Arithmetic & Assignment Operators
# ==============================

# Taking input from user
a = int(input("Enter first number: "))
b = int(input("Enter second number: "))

print("\n--- Arithmetic Operations ---")
print("Addition:", a + b)
print("Subtraction:", a - b)
print("Multiplication:", a * b)
print("Division:", a / b)
print("Floor Division:", a // b)
print("Modulus:", a % b)
print("Exponentiation:", a ** b)

# Assignment operations
print("\n--- Assignment Operations ---")
x = a  

x += b   
print("After += :", x)

x -= b  
print("After -= :", x)

x *= b  
print("After *= :", x)

x /= b   
print("After /= :", x)

x %= b  
print("After %= :", x)

x //= b 
print("After //= :", x)

x **= b  
print("After **= :", x)


# ==============================
# Task 2: Comparison & Logical Operators
# ==============================

age = int(input("\nEnter your age: "))
marks = int(input("Enter your marks: "))

print("\n--- Eligibility Check ---")

# AND condition
if age >= 18 and marks >= 50:
    print("Eligible")
else:
    print("Not Eligible")

# OR condition
if age < 18 or marks < 50:
    print("Not Eligible")
else:
    print("Eligible")

# NOT condition 
print("\n--- NOT Operator ---")
if not (age >= 18 and marks >= 50):
    print("NOT Eligible (using NOT operator)")
else:
    print("Eligible (using NOT operator)")


# ==============================
# Task 3: Bitwise Operators
# ==============================

num = int(input("\nEnter a number for bitwise operations: "))

print("\n--- Bitwise Operations ---")

# AND operation
print("Bitwise AND with 5:", num & 5)  

# OR operation
print("Bitwise OR with 3:", num | 3)    

# XOR operation
print("Bitwise XOR with 2:", num ^ 2)  

# Left shift
print("Left shift by 2:", num << 2)  

# Right shift
print("Right shift by 1:", num >> 1)   

# NOT operation
print("Bitwise NOT:", ~num)             