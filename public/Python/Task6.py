# ==================================================
# 1. LIST OPERATIONS
# ==================================================

marks = [78, 85, 92, 67, 74, 88, 90, 81, 76, 69]

# Add 2 new marks
marks.append(95)
marks.append(83)

# Insert one mark at 2nd position (index 1)
marks.insert(1, 89)

# Remove one specific mark (example: remove 67)
if 67 in marks:
    marks.remove(67)

# Remove last mark
marks.pop()

print("Updated Marks List:", marks)

# Required outputs
print("Highest Mark:", max(marks))
print("Lowest Mark:", min(marks))
print("Count of 85:", marks.count(85))

# Position of a particular mark (example: 90)
if 90 in marks:
    print("Position of 90:", marks.index(90))
else:
    print("90 not found")

# Sorted list
print("Ascending Order:", sorted(marks))

# Reverse order
marks.reverse()
print("Reversed List:", marks)


# ==================================================
# 2. TUPLE OPERATIONS
# ==================================================

employee = ("John Doe", 30, "IT Department")

# Tuple unpacking
name, age, department = employee

print("\nEmployee Details:")
print("Name:", name)
print("Age:", age)
print("Department:", department)


# ==================================================
# 3. SET OPERATIONS
# ==================================================

online_courses = {"Python", "Java", "Data Science", "C++", "AI"}
completed_courses = {"Python", "C++", "Web Development"}

print("\nSet Operations:")
print("Union:", online_courses | completed_courses)
print("Intersection:", online_courses & completed_courses)
print("Difference (Online - Completed):", online_courses - completed_courses)


# ==================================================
# 4. DICTIONARY OPERATIONS
# ==================================================

student = {
    "Name": "Alice",
    "Department": "Computer Science",
    "CGPA": 8.7,
    "City": "Coimbatore"
}

print("\nDictionary Operations:")
print("Keys:", student.keys())
print("Values:", student.values())
print("Items:", student.items())