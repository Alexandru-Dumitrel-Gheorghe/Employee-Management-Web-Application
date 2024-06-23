// Function setEmployees - Adds the array of employees to localStorage
function setEmployees(employees) {
  try {
    localStorage.setItem("employees", JSON.stringify(employees));
    console.log("Employees have been set in localStorage.");
  } catch (e) {
    console.error("Error setting employees in localStorage:", e);
  }
}

// Function getEmployees - Retrieves the array of employees from localStorage
function getEmployees() {
  try {
    const employees = localStorage.getItem("employees");
    console.log("Employees have been retrieved from localStorage.");
    return employees ? JSON.parse(employees) : [];
  } catch (e) {
    console.error("Error getting employees from localStorage:", e);
    return [];
  }
}

// Display employees in the HTML interface
function displayEmployees(employees) {
  const employeeList = document.getElementById("employeeList");
  employeeList.innerHTML = "";
  employees.forEach((employee, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      Name: ${employee.name}, Position: ${employee.position}, Salary: ${employee.salary}
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    employeeList.appendChild(listItem);
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      deleteEmployee(index);
    });
  });
}

// Handler for adding an employee
function addEmployee(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const salary = parseFloat(document.getElementById("salary").value);
  if (name && position && !isNaN(salary)) {
    const newEmployee = { name, position, salary };
    const employees = getEmployees();
    employees.push(newEmployee);
    setEmployees(employees);
    displayEmployees(employees);
    document.getElementById("name").value = "";
    document.getElementById("position").value = "";
    document.getElementById("salary").value = "";
  } else {
    alert("Please fill in all fields correctly.");
  }
}

// Handler for deleting an employee
function deleteEmployee(index) {
  const employees = getEmployees();
  employees.splice(index, 1);
  setEmployees(employees);
  displayEmployees(employees);
}

// Add event listener for the employee addition form
document.getElementById("employeeForm").addEventListener("submit", addEmployee);

// Initially display the employees saved in localStorage
const storedEmployees = getEmployees();
displayEmployees(storedEmployees);

// Handler for filtering employees
function filterEmployees(searchInput) {
  const employees = getEmployees();
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchInput.toLowerCase())
    );
  });
  displayEmployees(filteredEmployees);
}

// Event listener for search input
document.getElementById("search").addEventListener("input", (event) => {
  filterEmployees(event.target.value);
});

document.addEventListener("DOMContentLoaded", function () {
  const acceptButtons = document.querySelectorAll(".accept-btn");

  acceptButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Toggle 'accepted' class and disable button
      button.classList.toggle("accepted");
      button.disabled = true;

      // Create and append popup
      const popup = document.createElement("div");
      popup.classList.add("popup");
      popup.innerHTML = `
        <div class="popup-content">
          <span class="close-popup">&times;</span>
          <p>Task accepted!</p>
        </div>
      `;
      document.body.appendChild(popup);

      // Close popup after 4 seconds
      setTimeout(function () {
        if (document.body.contains(popup)) {
          document.body.removeChild(popup);
        }
      }, 4000);

      // Close popup when close button is clicked
      const closeBtn = popup.querySelector(".close-popup");
      closeBtn.addEventListener("click", function () {
        document.body.removeChild(popup);
      });

      // Example action: Log the task description
      const taskDescriptionElement = button.parentElement.querySelector("p");
      const taskDescription = taskDescriptionElement
        ? taskDescriptionElement.textContent.trim()
        : "Task description not found";
      console.log(`Task accepted: ${taskDescription}`);
    });
  });
});

const searchContainer = document.querySelector(".search-container");

window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    searchContainer.classList.add("hidden");
  } else {
    searchContainer.classList.remove("hidden");
  }
});
