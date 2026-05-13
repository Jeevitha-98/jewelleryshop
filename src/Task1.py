# ==============================
# Task 4: Input & Variables
# ==============================

name = input("Enter your name: ")
age = input("Enter your age: ")
department = input("Enter your department: ")

print("--- Student Details ---")
print("Name:", name)
print("Age:", age)
print("Department:", department)

# ==============================
# Task 5: Datatypes & Type Casting
# ==============================

age_input = input("\nEnter your age (for type casting): ")

print("Before conversion:")
print("Value:", age_input)
print("Datatype:", type(age_input))

age_converted = int(age_input)

print("After conversion:")
print("Value:", age_converted)
print("Datatype:", type(age_converted))


# ==============================
# Task 6: Simple Logic
# ==============================

age_check = int(input("\nEnter your age to check eligibility: "))

if age_check >= 18:
    print("Eligible")
else:
    print("Not Eligible")

