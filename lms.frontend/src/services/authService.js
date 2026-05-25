import apiClient from "./apiClient";

const mockUsers = [
  {
    email: "rohit@lms.com",
    password: "rohit",
    role: "STUDENT",
    username: "Rohit",
  },
  {
    email: "rahul.ins@lms.com",
    password: "rahul",
    role: "INSTRUCTOR",
    username: "Rahul",
  },
  {
    email: "rachit.adm@lms.com",
    password: "rachit",
    role: "ADMIN",
    username: "Rachit",
  },
];

const createMockResponse = ({ email, role, username }) => {
  return {
    token: "mock-token",
    role,
    email,
    username,
  };
};

const getMockUser = (credentials) => {
  if (!credentials?.email || !credentials?.password) return null;
  return mockUsers.find(
    (user) =>
      user.email.toLowerCase() === credentials.email.toLowerCase() &&
      user.password === credentials.password
  );
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    console.log("Login API Response:", response.data);

    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("username", response.data.username);

      return response.data;
    }

    throw new Error(response.data?.message || "Login failed");
  } catch (error) {
    console.warn("Backend login failed, falling back to frontend-only mock login.", error);

    const mockUser = getMockUser(credentials);
    if (mockUser) {
      const mockResponse = createMockResponse(mockUser);
      localStorage.setItem("token", mockResponse.token);
      localStorage.setItem("userRole", mockResponse.role);
      localStorage.setItem("userEmail", mockResponse.email);
      localStorage.setItem("username", mockResponse.username);

      return mockResponse;
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw error;
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const register = async (userData) => {
  try {
    const response = await apiClient.post("/auth/signup", userData);
    console.log("Register API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration service error:", error);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Registration failed. Please try again.");
    }
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("username");
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const email = localStorage.getItem("userEmail");
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  return token
    ? {
        token,
        role,
        email,
        username,
        id: userId ? parseInt(userId) : null, // ✅ Include user ID
      }
    : null;
};
