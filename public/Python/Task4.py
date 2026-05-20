# Task 1: Python – While Loop

n = int(input("Enter a number: "))

i = 1
total = 0

while i <= n:
    print(i)
    total += i
    i += 1

print("Sum =", total)


# Task 2: Python – For Loop with range()

print("Numbers from 1 to 10:")
for i in range(1, 11):
    print(i)

print("Even numbers between 2 and 20:")
for i in range(2, 21, 2):
    print(i)

print("Numbers from 20 to 1 in reverse order:")
for i in range(20, 0, -1):
    print(i)


# Task 3: Python – break and continue

print("Using break:")
for i in range(1, 16):
    if i == 8:
        break
    print(i)

print("Using continue (skip multiples of 3):")
for i in range(1, 16):
    if i % 3 == 0:
        continue
    print(i)


# Task 4: Python – Nested Loop Pattern

print("Pattern:")
for i in range(1, 6):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()