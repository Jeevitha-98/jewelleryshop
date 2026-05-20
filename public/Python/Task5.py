# Create a list containing minimum 10 numbers
numbers = [45, 12, 78, 34, 56, 90, 23, 11, 67, 89]

print("Original list:", numbers)

# Add a new number at the end using append()
numbers.append(100)
print("After append(100):", numbers)

# Insert a number at 3rd position (index 2)
numbers.insert(2, 999)
print("After insert(2, 999):", numbers)

# Remove a specific number (example: 34)
numbers.remove(34)
print("After remove(34):", numbers)

# Remove last element using pop()
numbers.pop()
print("After pop():", numbers)

# Find index of a given number (example: 56)
index_value = numbers.index(56)
print("Index of 56:", index_value)

# Count occurrence of a number (example: 12)
count_value = numbers.count(12)
print("Count of 12:", count_value)

# Sort the list in ascending order
numbers.sort()
print("After sort():", numbers)

# Reverse the list
numbers.reverse()
print("After reverse():", numbers)

# Create another list
second_list = [5, 15, 25]

# Combine both lists using extend()
numbers.extend(second_list)
print("After extend(second_list):", numbers)