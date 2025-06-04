// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Authentication Forms Validation
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // Register Form Validation
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const termsCheck = document.getElementById("termsCheck").checked;
      const registerAlert = document.getElementById("registerAlert");

      let isValid = true;

      // Reset previous validation
      registerAlert.classList.add("d-none");
      document
        .querySelectorAll(".is-invalid")
        .forEach((el) => el.classList.remove("is-invalid"));

      // Validate Full Name
      if (fullName === "") {
        document.getElementById("fullName").classList.add("is-invalid");
        isValid = false;
      }

      // Validate Email
      if (email === "" || !isValidEmail(email)) {
        document.getElementById("email").classList.add("is-invalid");
        isValid = false;
      }

      // Validate Password
      if (password.length < 8) {
        document.getElementById("password").classList.add("is-invalid");
        isValid = false;
      }

      // Validate Confirm Password
      if (password !== confirmPassword) {
        document.getElementById("confirmPassword").classList.add("is-invalid");
        isValid = false;
      }

      // Validate Terms
      if (!termsCheck) {
        document.getElementById("termsCheck").classList.add("is-invalid");
        isValid = false;
      }

      if (!isValid) {
        registerAlert.classList.remove("d-none");
        registerAlert.textContent = "Please correct the errors in the form.";
      } else {
// Store user data
        const userData = {
        fullName: fullName,
        email: email,
        password: password // Note: In real apps, never store plain passwords
      };
      localStorage.setItem('user_' + email, JSON.stringify(userData));
  
      alert("Registration successful! You can now log in.");
      window.location.href = "login.html";
}
    });
  }

  // Login Form Validation
  if (loginForm) {
    // Pre-fill email if remembered
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      document.getElementById('loginEmail').value = rememberedEmail;
      document.getElementById('rememberMe').checked = true;
    }
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const loginAlert = document.getElementById("loginAlert");

      let isValid = true;

      // Reset previous validation
      loginAlert.classList.add("d-none");
      document
        .querySelectorAll(".is-invalid")
        .forEach((el) => el.classList.remove("is-invalid"));

      // Validate Email
      if (email === "" || !isValidEmail(email)) {
        document.getElementById("loginEmail").classList.add("is-invalid");
        isValid = false;
      }

      // Validate Password
      if (password === "") {
        document.getElementById("loginPassword").classList.add("is-invalid");
        isValid = false;
      }

      if (!isValid) {
        loginAlert.classList.remove("d-none");
        loginAlert.textContent = "Please enter a valid email and password.";
      } else {
        // Check credentials
        const userKey = 'user_' + email;
        const storedUser = JSON.parse(localStorage.getItem(userKey));

        if (storedUser && storedUser.password === password) {
    // Create session
          localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            name: storedUser.fullName
          }));
    
    // Remember email if checked
          if (document.getElementById('rememberMe').checked) {
            localStorage.setItem('rememberedEmail', email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
    
          alert("Login successful!");
          window.location.href = "dashboard.html";
        } else {
          loginAlert.classList.remove("d-none");
          loginAlert.textContent = "Invalid email or password.";
        }
      }
    });
  }

  // Dashboard Tasks
  const addTaskBtn = document.getElementById("addTaskBtn");
  const saveTaskBtn = document.getElementById("saveTaskBtn");
  const cancelTaskBtn = document.getElementById("cancelTaskBtn");
  const taskForm = document.getElementById("taskForm");
  const tasksList = document.getElementById("tasksList");

  if (addTaskBtn && taskForm) {
    // Sample tasks data
    let tasks = [
      { id: 1, name: "Run 5km", goal: "5km", progress: 3 },
      { id: 2, name: "Do 50 Push-ups", goal: "50 reps", progress: 30 },
      { id: 3, name: "Yoga Session", goal: "30 minutes", progress: 15 },
    ];

    // Show task form
    addTaskBtn.addEventListener("click", () => {
      taskForm.classList.remove("d-none");
    });

    // Hide task form
    cancelTaskBtn.addEventListener("click", () => {
      taskForm.classList.add("d-none");
      clearTaskForm();
    });

    // Save task
    saveTaskBtn.addEventListener("click", () => {
      const taskName = document.getElementById("taskName").value.trim();
      const taskGoal = document.getElementById("taskGoal").value.trim();
      const taskProgress =
        Number.parseInt(document.getElementById("taskProgress").value) || 0;

      if (taskName === "" || taskGoal === "") {
        alert("Please fill in all fields");
        return;
      }

      const newTask = {
        id: Date.now(),
        name: taskName,
        goal: taskGoal,
        progress: taskProgress,
      };

      tasks.push(newTask);
      renderTasks();
      taskForm.classList.add("d-none");
      clearTaskForm();
    });

    // Render tasks
    function renderTasks() {
      tasksList.innerHTML = "";

      tasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.dataset.id = task.id;

        // Calculate progress percentage
        let progressPercent = 0;
        let goalValue = 0;

        if (task.goal.includes("km")) {
          goalValue = Number.parseFloat(task.goal);
          progressPercent = (task.progress / goalValue) * 100;
        } else if (task.goal.includes("reps")) {
          goalValue = Number.parseInt(task.goal);
          progressPercent = (task.progress / goalValue) * 100;
        } else if (task.goal.includes("minutes")) {
          goalValue = Number.parseInt(task.goal);
          progressPercent = (task.progress / goalValue) * 100;
        }

        progressPercent = Math.min(Math.max(progressPercent, 0), 100);

        taskCard.innerHTML = `
                    <div class="task-header">
                        <h3 class="task-title">${task.name}</h3>
                        <div class="task-actions">
                            <button class="btn btn-sm btn-outline-primary edit-task-btn" data-id="${
                              task.id
                            }">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-task-btn" data-id="${
                              task.id
                            }">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="task-progress">
                        <div class="task-progress-label">
                            <span>Progress: ${task.progress} / ${
          task.goal
        }</span>
                            <span>${progressPercent.toFixed(0)}%</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: ${progressPercent}%" 
                                aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                `;

        tasksList.appendChild(taskCard);
      });

      // Add event listeners to edit and delete buttons
      document.querySelectorAll(".edit-task-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const taskId = Number.parseInt(this.dataset.id);
          editTask(taskId);
        });
      });

      document.querySelectorAll(".delete-task-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const taskId = Number.parseInt(this.dataset.id);
          deleteTask(taskId);
        });
      });
    }

    // Edit task
    function editTask(taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      document.getElementById("taskName").value = task.name;
      document.getElementById("taskGoal").value = task.goal;
      document.getElementById("taskProgress").value = task.progress;

      // Remove the task from the array
      tasks = tasks.filter((t) => t.id !== taskId);

      taskForm.classList.remove("d-none");
    }

    // Delete task
    function deleteTask(taskId) {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter((t) => t.id !== taskId);
        renderTasks();
      }
    }

    // Clear task form
    function clearTaskForm() {
      document.getElementById("taskName").value = "";
      document.getElementById("taskGoal").value = "";
      document.getElementById("taskProgress").value = "";
    }

    // Initial render
    renderTasks();

    // Weekly Progress Chart
    const weeklyChart = document.getElementById("weeklyChart");
    if (weeklyChart) {
      const ctx = weeklyChart.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Steps",
              data: [8000, 10500, 9200, 7800, 12000, 9500, 8500],
              backgroundColor: "rgba(76, 175, 80, 0.5)",
              borderColor: "rgba(76, 175, 80, 1)",
              borderWidth: 1,
            },
            {
              label: "Calories Burned",
              data: [350, 450, 400, 320, 500, 420, 380],
              backgroundColor: "rgba(255, 87, 34, 0.5)",
              borderColor: "rgba(255, 87, 34, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  // Random Fitness Challenge
  const randomChallengeBtn = document.getElementById("randomChallengeBtn");
  const challengeResult = document.getElementById("challengeResult");

  if (randomChallengeBtn && challengeResult) {
    // Array of exercise challenges
    const exercises = [
      "jumping jacks",
      "push-ups",
      "squats",
      "lunges",
      "mountain climbers",
      "burpees",
      "sit-ups",
      "high knees",
      "plank seconds",
      "crunches",
    ];

    randomChallengeBtn.addEventListener("click", () => {
      // Generate random number between 1 and 100
      const randomNumber = Math.floor(Math.random() * 100) + 1;

      // Determine if number is even or odd
      const isEven = randomNumber % 2 === 0;
      const evenOddText = isEven ? "even" : "odd";

      // Determine if number is greater than 50
      const isGreaterThan50 = randomNumber > 50;
      const comparisonText = isGreaterThan50
        ? "greater than 50"
        : "less than or equal to 50";

      // Get random exercise
      const randomExercise =
        exercises[Math.floor(Math.random() * exercises.length)];

      // Create message
      const message = `Your number is ${randomNumber} — it's ${evenOddText} and ${comparisonText}!`;
      const challenge = `Your challenge: Do ${randomNumber} ${randomExercise}!`;

      // Determine alert type based on number
      let alertClass = "alert-primary";
      if (randomNumber > 75) {
        alertClass = "alert-danger"; // Hard challenge
      } else if (randomNumber > 50) {
        alertClass = "alert-warning"; // Medium challenge
      } else if (randomNumber > 25) {
        alertClass = "alert-info"; // Moderate challenge
      } else {
        alertClass = "alert-success"; // Easy challenge
      }

      // Update the challenge result
      challengeResult.innerHTML = `
        <div class="challenge-number">${randomNumber}</div>
        <div class="challenge-message">${message}</div>
        <div class="challenge-exercise">${challenge}</div>
        <div class="alert ${alertClass} challenge-alert">
          <i class="fas fa-info-circle"></i> 
          ${
            isGreaterThan50
              ? "This is a challenging workout!"
              : "This is a good starter workout!"
          }
        </div>
      `;

      // Show the result with jQuery animation
      $(challengeResult).hide().removeClass("d-none").fadeIn(500);
    });
  }

  // Nutrition Page
  const addMealBtn = document.getElementById("addMealBtn");
  const saveMealBtn = document.getElementById("saveMealBtn");
  const cancelMealBtn = document.getElementById("cancelMealBtn");
  const mealForm = document.getElementById("mealForm");
  const mealsTableBody = document.getElementById("mealsTableBody");

  if (addMealBtn && mealForm) {
    // Sample meals data
    let meals = [
      {
        id: 1,
        meal: "Breakfast",
        food: "Oatmeal with Berries",
        calories: 350,
        protein: 15,
        carbs: 45,
        fats: 10,
      },
      {
        id: 2,
        meal: "Lunch",
        food: "Grilled Chicken Salad",
        calories: 420,
        protein: 35,
        carbs: 20,
        fats: 15,
      },
      {
        id: 3,
        meal: "Dinner",
        food: "Salmon with Vegetables",
        calories: 480,
        protein: 40,
        carbs: 25,
        fats: 20,
      },
    ];

    // Show meal form
    addMealBtn.addEventListener("click", () => {
      mealForm.classList.remove("d-none");
    });

    // Hide meal form
    cancelMealBtn.addEventListener("click", () => {
      mealForm.classList.add("d-none");
      clearMealForm();
    });

    // Save meal
    saveMealBtn.addEventListener("click", () => {
      const mealName = document.getElementById("mealName").value.trim();
      const foodItem = document.getElementById("foodItem").value.trim();
      const calories =
        Number.parseInt(document.getElementById("calories").value) || 0;
      const protein =
        Number.parseInt(document.getElementById("protein").value) || 0;
      const carbs =
        Number.parseInt(document.getElementById("carbs").value) || 0;
      const fats = Number.parseInt(document.getElementById("fats").value) || 0;

      if (mealName === "" || foodItem === "") {
        alert("Please fill in all required fields");
        return;
      }

      const newMeal = {
        id: Date.now(),
        meal: mealName,
        food: foodItem,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fats: fats,
      };

      meals.push(newMeal);
      renderMeals();
      mealForm.classList.add("d-none");
      clearMealForm();
    });

    // Filter meals
    const filterBtn = document.getElementById("filterBtn");
    const resetFilterBtn = document.getElementById("resetFilterBtn");

    if (filterBtn && resetFilterBtn) {
      filterBtn.addEventListener("click", () => {
        const minCalories =
          Number.parseInt(document.getElementById("minCalories").value) || 0;
        const maxCalories =
          Number.parseInt(document.getElementById("maxCalories").value) ||
          Number.POSITIVE_INFINITY;

        const filteredMeals = meals.filter((meal) => {
          return meal.calories >= minCalories && meal.calories <= maxCalories;
        });

        renderMeals(filteredMeals);
      });

      resetFilterBtn.addEventListener("click", () => {
        document.getElementById("minCalories").value = "";
        document.getElementById("maxCalories").value = "";
        renderMeals();
      });
    }

    // Render meals
    function renderMeals(mealsToRender = meals) {
      if (!mealsTableBody) return;

      mealsTableBody.innerHTML = "";

      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;

      mealsToRender.forEach((meal) => {
        const row = document.createElement("tr");
        row.dataset.id = meal.id;

        row.innerHTML = `
                    <td>${meal.meal}</td>
                    <td>${meal.food}</td>
                    <td>${meal.calories}</td>
                    <td>${meal.protein}</td>
                    <td>${meal.carbs}</td>
                    <td>${meal.fats}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger delete-meal-btn" data-id="${meal.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;

        mealsTableBody.appendChild(row);

        totalCalories += meal.calories;
        totalProtein += meal.protein;
        totalCarbs += meal.carbs;
        totalFats += meal.fats;
      });

      // Update totals
      document.getElementById("totalCalories").textContent = totalCalories;
      document.getElementById("totalProtein").textContent = totalProtein;
      document.getElementById("totalCarbs").textContent = totalCarbs;
      document.getElementById("totalFats").textContent = totalFats;

      // Add event listeners to delete buttons
      document.querySelectorAll(".delete-meal-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const mealId = Number.parseInt(this.dataset.id);
          deleteMeal(mealId);
        });
      });

      // Update charts
      updateNutritionCharts(totalCalories, totalProtein, totalCarbs, totalFats);
    }

    // Delete meal
    function deleteMeal(mealId) {
      if (confirm("Are you sure you want to delete this meal?")) {
        meals = meals.filter((m) => m.id !== mealId);
        renderMeals();
      }
    }

    // Clear meal form
    function clearMealForm() {
      document.getElementById("mealName").value = "";
      document.getElementById("foodItem").value = "";
      document.getElementById("calories").value = "";
      document.getElementById("protein").value = "";
      document.getElementById("carbs").value = "";
      document.getElementById("fats").value = "";
    }

    // Update nutrition charts
    function updateNutritionCharts(calories, protein, carbs, fats) {
      const calorieChart = document.getElementById("calorieChart");
      const macroChart = document.getElementById("macroChart");

      if (calorieChart) {
        const calorieGoal =
          Number.parseInt(
            document.getElementById("calorieGoal").textContent.replace(/,/g, "")
          ) || 2000;
        const caloriesLeft = Math.max(0, calorieGoal - calories);

        const ctx1 = calorieChart.getContext("2d");

        // Destroy existing chart if it exists
        if (window.calorieChartInstance) {
          window.calorieChartInstance.destroy();
        }

        window.calorieChartInstance = new Chart(ctx1, {
          type: "doughnut",
          data: {
            labels: ["Consumed", "Remaining"],
            datasets: [
              {
                data: [calories, caloriesLeft],
                backgroundColor: [
                  "rgba(76, 175, 80, 0.8)",
                  "rgba(238, 238, 238, 0.8)",
                ],
                borderColor: ["rgba(76, 175, 80, 1)", "rgba(238, 238, 238, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Calorie Goal Progress",
              },
            },
          },
        });
      }

      if (macroChart) {
        const ctx2 = macroChart.getContext("2d");

        // Destroy existing chart if it exists
        if (window.macroChartInstance) {
          window.macroChartInstance.destroy();
        }

        window.macroChartInstance = new Chart(ctx2, {
          type: "bar",
          data: {
            labels: ["Protein", "Carbs", "Fats"],
            datasets: [
              {
                label: "Grams",
                data: [protein, carbs, fats],
                backgroundColor: [
                  "rgba(33, 150, 243, 0.8)",
                  "rgba(255, 193, 7, 0.8)",
                  "rgba(255, 87, 34, 0.8)",
                ],
                borderColor: [
                  "rgba(33, 150, 243, 1)",
                  "rgba(255, 193, 7, 1)",
                  "rgba(255, 87, 34, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Macronutrient Distribution",
              },
            },
          },
        });
      }
    }

    // Edit nutrition goals
    const editGoalBtns = document.querySelectorAll(".edit-goal-btn");
    const saveGoalBtn = document.getElementById("saveGoalBtn");

    if (editGoalBtns.length && saveGoalBtn) {
      let currentGoal = "";

      editGoalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          currentGoal = this.dataset.goal;
          const goalValue = document
            .getElementById(`${currentGoal}Goal`)
            .textContent.replace(/[^0-9]/g, "");

          document.getElementById("editGoalTitle").textContent = `Edit ${
            currentGoal.charAt(0).toUpperCase() + currentGoal.slice(1)
          } Goal`;
          document.getElementById("goalValue").value = goalValue;

          const editGoalModal = new bootstrap.Modal(
            document.getElementById("editGoalModal")
          );
          editGoalModal.show();
        });
      });

      saveGoalBtn.addEventListener("click", () => {
        const newValue = document.getElementById("goalValue").value;

        if (newValue && currentGoal) {
          let displayValue = newValue;

          if (currentGoal === "calories") {
            displayValue = Number.parseInt(newValue).toLocaleString();
          } else {
            displayValue = `${newValue}g`;
          }

          document.getElementById(`${currentGoal}Goal`).textContent =
            displayValue;

          // Close modal
          bootstrap.Modal.getInstance(
            document.getElementById("editGoalModal")
          ).hide();

          // Update charts
          const totalCalories = Number.parseInt(
            document.getElementById("totalCalories").textContent
          );
          const totalProtein = Number.parseInt(
            document.getElementById("totalProtein").textContent
          );
          const totalCarbs = Number.parseInt(
            document.getElementById("totalCarbs").textContent
          );
          const totalFats = Number.parseInt(
            document.getElementById("totalFats").textContent
          );

          updateNutritionCharts(
            totalCalories,
            totalProtein,
            totalCarbs,
            totalFats
          );
        }
      });
    }

    // Initial render
    renderMeals();
  }

  // Community Page
  const groupsContainer = document.getElementById("groupsContainer");

  if (groupsContainer) {
    // Sample groups data
    const groups = [
      {
        id: 1,
        name: "Running Club",
        description:
          "Join fellow runners for training tips, race information, and motivation.",
        members: 1250,
        image: "../images/Running_Club.webp",
      },
      {
        id: 2,
        name: "Vegan Fitness",
        description:
          "Plant-based nutrition and workout plans for optimal health and performance.",
        members: 875,
        image: "../images/Vegan_Fitness.webp",
      },
      {
        id: 3,
        name: "HIIT Warriors",
        description:
          "High-intensity interval training workouts and challenges for maximum results.",
        members: 1540,
        image: "../images/HIIT_Warriors.webp",
      },
      {
        id: 4,
        name: "Yoga & Meditation",
        description:
          "Find balance with yoga practices and mindfulness techniques for body and mind.",
        members: 2100,
        image: "../images/Yoga&Meditation.webp",
      },
    ];

    // Render groups
    groups.forEach((group) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-3 mb-4";

      col.innerHTML = `
                <div class="card group-card">
                    <img src="${
                      group.image
                    }" class="card-img-top group-card-img" alt="${group.name}" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">${group.name}</h5>
                        <p class="card-text text-muted">${group.members.toLocaleString()} members</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-primary join-group-btn" data-id="${
                              group.id
                            }">Join Group</button>
                            <button class="btn btn-link details-toggle" data-id="${
                              group.id
                            }">
                                <i class="fas fa-chevron-down"></i> Details
                            </button>
                        </div>
                    </div>
                    <div class="group-details" id="details-${group.id}">
                        <p>${group.description}</p>
                    </div>
                </div>
            `;

      groupsContainer.appendChild(col);
    });

    // Join group buttons
    document.querySelectorAll(".join-group-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const groupId = this.dataset.id;
        const group = groups.find((g) => g.id === Number.parseInt(groupId));

        if (group) {
          alert(`You have joined the ${group.name} group!`);
          this.textContent = "Joined";
          this.classList.remove("btn-primary");
          this.classList.add("btn-success");
          this.disabled = true;
        }
      });
    });

    // Toggle group details
    document.querySelectorAll(".details-toggle").forEach((btn) => {
      btn.addEventListener("click", function () {
        const groupId = this.dataset.id;
        const detailsElement = document.getElementById(`details-${groupId}`);

        if (detailsElement) {
          $(detailsElement).slideToggle(300);

          const icon = this.querySelector("i");
          if (icon.classList.contains("fa-chevron-down")) {
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
          } else {
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
          }
        }
      });
    });
  }
});

// Helper Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Inside: if (registerForm) {...}, where isValid == true
if (isValid) {
  // Store user data
  const userData = {
    fullName: fullName,
    email: email,
    password: password // Note: In real apps, never store plain passwords
  };
  localStorage.setItem('user_' + email, JSON.stringify(userData));
  
  alert("Registration successful!");
  window.location.href = "login.html";
}

// Inside: if (loginForm) {...}, after checking isValid
if (isValid) {
  // Check credentials
  const userKey = 'user_' + email;
  const storedUser = JSON.parse(localStorage.getItem(userKey));

  if (storedUser && storedUser.password === password) {
    // Create session
    localStorage.setItem('currentUser', JSON.stringify({
      email: email,
      name: storedUser.fullName
    }));
    
    // Remember email if checked
    if (document.getElementById('rememberMe').checked) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    loginAlert.classList.remove("d-none");
    loginAlert.textContent = "Invalid email or password.";
  }
}

// Right after: if (loginForm) { ... }
const rememberedEmail = localStorage.getItem('rememberedEmail');
if (rememberedEmail) {
  document.getElementById('loginEmail').value = rememberedEmail;
  document.getElementById('rememberMe').checked = true;
}