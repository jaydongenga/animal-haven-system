
# Farm Management System

## Overview
This console application implements a Farm Management System that allows users to log in and manage various operations related to animals on the farm. The system allows an Admin to manage animal records (adding, removing, updating, viewing), while other users (Farmers) can only view animal details.

## Features
- User authentication (Admin and Farmer roles)
- Animal management (Add, Remove, Update, View)
- File-based storage (JSON)
- Exception handling
- Input validation

## Design Decisions
The system is designed using object-oriented programming concepts:
- Abstract classes: `Person` is the abstract base class for `Admin` and `Farmer`
- Interfaces: `IAccount` for authentication and `IManagement` for animal management
- Custom exceptions: `InvalidLoginException`, `InvalidInputException`, and `AnimalNotFoundException`
- File-based persistence using JSON serialization

## Class Relationships
- `Person` (Abstract) -> `Admin`, `Farmer`
- `AuthenticationService` implements `IAccount`
- `AnimalManagementService` implements `IManagement`

## Testing Approach
The system can be tested using the following scenarios:
1. Login with valid and invalid credentials
2. Add new animals with valid and invalid data
3. Remove existing and non-existing animals
4. Update animal details
5. View animal list
6. Test persistence by restarting the application

## Usage
- Admin login: Username: `admin`, Password: `admin123`
- Farmer login: Username: `farmer1`, Password: `farmer123`

## Requirements
- .NET 6.0 or later
- Visual Studio 2022
