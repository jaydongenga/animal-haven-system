
using System;

namespace FarmManagementSystem
{
    /// <summary>
    /// Interface for login functionality
    /// </summary>
    public interface IAccount
    {
        Person Login(string username, string password);
    }
}
