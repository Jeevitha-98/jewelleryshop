# ==========================================
# 📌 Task 5: Python – Basic Conditional Statements
# ==========================================


marks = int(input("Enter your marks: "))


if marks >= 90:
    print("Grade A")
elif marks >= 75:
    print("Grade B")
elif marks >= 50:
    print("Grade C")
else:
    print("Fail")


# ==========================================
# 📌 Task 6: Python – Nested If
# ==========================================


age = int(input("Enter your age: "))
citizenship = input("Enter citizenship status (yes/no): ")


if age >= 18:
    if citizenship.lower() == "yes":
        print("Eligible to Vote")
    else:
        print("Citizenship Required")
else:
    print("Not Eligible")


# ==========================================
# 📌 Task 7: Python – Multiple Conditions
# ==========================================


username = input("Enter username: ")
password = input("Enter password: ")


if username == "trainee" and password == "python123":
    print("Login Successful")
else:
    print("Invalid Credentials")