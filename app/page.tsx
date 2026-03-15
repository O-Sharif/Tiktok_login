"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, ChevronDown, ChevronLeft, Database } from "lucide-react"

interface User {
  phone: string
  countryCode: string
  password: string
  createdAt: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [countryCode, setCountryCode] = useState("BD +880")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDatabase, setShowDatabase] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState("")

  const countryCodes = [
    "BD +880",
    "US +1",
    "UK +44",
    "IN +91",
    "CA +1",
    "AU +61",
  ]

  useEffect(() => {
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      setMessage("Please fill in all fields")
      return
    }

    const storedUsers = localStorage.getItem("users")
    const existingUsers: User[] = storedUsers ? JSON.parse(storedUsers) : []

    const existingUser = existingUsers.find(
      (u) => u.phone === phoneNumber && u.countryCode === countryCode
    )

    if (existingUser) {
      if (existingUser.password === password) {
        setMessage("Login successful!")
      } else {
        setMessage("Incorrect password")
      }
    } else {
      const newUser: User = {
        phone: phoneNumber,
        countryCode: countryCode,
        password: password,
        createdAt: new Date().toLocaleString(),
      }
      const updatedUsers = [...existingUsers, newUser]
      localStorage.setItem("users", JSON.stringify(updatedUsers))
      setUsers(updatedUsers)
      setMessage("Account created and logged in!")
    }

    setTimeout(() => setMessage(""), 3000)
  }

  const refreshUsers = () => {
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Log in</h1>

        {/* Phone Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-black">Phone</span>
            <button className="text-sm text-blue-500 hover:underline">
              Log in with email or username
            </button>
          </div>

          {/* Phone Input */}
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-3 bg-white border-r border-gray-200 text-black hover:bg-gray-50"
              >
                <span className="text-sm">{countryCode}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                  {countryCodes.map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCountryCode(code)
                        setShowDropdown(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-4 py-3 text-sm outline-none text-black placeholder-gray-400"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <div className="flex items-center border border-gray-200 rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-4 py-3 text-sm outline-none rounded-l-md text-black placeholder-gray-400"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="px-4 py-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 mb-6">
          <button className="text-sm text-black hover:underline">
            Forgot password?
          </button>
          <span className="text-gray-300">|</span>
          <button className="text-sm text-black hover:underline">
            Log in with code
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`text-center text-sm mb-4 p-2 rounded ${
              message.includes("successful") || message.includes("created")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Log in
        </button>

        {/* Go Back */}
        <button className="w-full flex items-center justify-center gap-1 mt-6 text-sm text-black hover:underline">
          <ChevronLeft className="w-4 h-4" />
          Go back
        </button>
      </div>

      {/* Database Debug Button */}
      <button
        onClick={() => {
          refreshUsers()
          setShowDatabase(!showDatabase)
        }}
        className="fixed bottom-3 right-3 w-5 h-5 bg-gray-400 hover:bg-gray-500 hover:opacity-100 rounded-full flex items-center justify-center transition-all opacity-30"
        title="View User Database"
      >
        <Database className="w-2.5 h-2.5 text-gray-700" />
      </button>

      {/* Database Modal */}
      {showDatabase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-black">
                User Database (Debug View)
              </h2>
              <button
                onClick={() => setShowDatabase(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[60vh]">
              {users.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No users registered yet. Login to create a new account.
                </p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 text-sm font-semibold text-black border-b">
                        #
                      </th>
                      <th className="text-left p-3 text-sm font-semibold text-black border-b">
                        Country Code
                      </th>
                      <th className="text-left p-3 text-sm font-semibold text-black border-b">
                        Phone Number
                      </th>
                      <th className="text-left p-3 text-sm font-semibold text-black border-b">
                        Password
                      </th>
                      <th className="text-left p-3 text-sm font-semibold text-black border-b">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-3 text-sm text-gray-700 border-b">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 border-b">
                          {user.countryCode}
                        </td>
                        <td className="p-3 text-sm text-gray-700 border-b">
                          {user.phone}
                        </td>
                        <td className="p-3 text-sm text-gray-700 border-b font-mono">
                          {user.password}
                        </td>
                        <td className="p-3 text-sm text-gray-700 border-b">
                          {user.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={() => {
                  localStorage.removeItem("users")
                  setUsers([])
                }}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
              >
                Clear All Data
              </button>
              <button
                onClick={() => setShowDatabase(false)}
                className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
