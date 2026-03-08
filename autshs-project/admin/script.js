// ============ LOGIN PAGE SCRIPT ============

// Check if we're on login page
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Password toggle visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.innerHTML = type === 'password' 
            ? '<i class="fas fa-eye"></i>' 
            : '<i class="fas fa-eye-slash"></i>';
    });

    // Check if user was previously remembered
    window.addEventListener('load', () => {
        const savedUsername = localStorage.getItem('adminUsername');
        if (savedUsername) {
            usernameInput.value = savedUsername;
            rememberMeCheckbox.checked = true;
        }
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Clear previous messages
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
        successMessage.textContent = '';
        successMessage.classList.remove('show');

        // Validate inputs
        if (!username || !password) {
            showError('Please enter both username and password.');
            return;
        }

        // Simulate authentication (In real app, this would be server-side)
        // Demo credentials: username: admin, password: password123
        if (username === 'admin' && password === 'password123') {
            // Save username if "Remember me" is checked
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('adminUsername', username);
            } else {
                localStorage.removeItem('adminUsername');
            }

            // Store admin session
            sessionStorage.setItem('adminLoggedIn', 'true');
            sessionStorage.setItem('adminUsername', username);

            // Show success message
            successMessage.textContent = 'Login successful! Redirecting...';
            successMessage.classList.add('show');

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showError('Invalid username or password.');
            passwordInput.value = '';
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
}

// ============ ADMIN DASHBOARD SCRIPT ============

// Check if we're on dashboard page
if (document.querySelector('.admin-dashboard')) {
    // Check if user is authenticated
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
        //window.location.href = 'login.html';
    }

    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    const adminUsername = document.getElementById('adminUsername');
    const logoutBtn = document.getElementById('logoutBtn');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    const addPageBtn = document.getElementById('addPageBtn');
    const lastUpdatedEl = document.getElementById('lastUpdated');

    // Display admin username
    const username = sessionStorage.getItem('adminUsername') || 'Admin';
    adminUsername.textContent = username;

    // Update last updated date
    const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    lastUpdatedEl.textContent = today;

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');

            // Get section ID from data attribute
            const sectionId = link.getAttribute('data-section');

            // Hide all sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                updatePageTitle(sectionId);
            }

            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                adminSidebar.classList.remove('active');
            }
        });
    });

    // Update page title based on section
    function updatePageTitle(sectionId) {
        const titles = {
            'dashboard': 'Dashboard',
            'pages': 'Manage Pages',
            'settings': 'Website Settings',
            'content': 'Edit Content',
            'users': 'User Management',
            'maintenance': 'Maintenance & Tools'
        };
        pageTitle.textContent = titles[sectionId] || 'Dashboard';
    }

    // Sidebar toggle on mobile
    sidebarToggle.addEventListener('click', () => {
        adminSidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.admin-sidebar') && !e.target.closest('.sidebar-toggle')) {
            adminSidebar.classList.remove('active');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('adminLoggedIn');
            sessionStorage.removeItem('adminUsername');
            localStorage.removeItem('adminUsername');
            window.location.href = 'login.html';
        }
    });

    // Add page button
    if (addPageBtn) {
        addPageBtn.addEventListener('click', () => {
            alert('Add new page feature would be implemented here');
        });
    }

    // Edit and delete buttons
    const editBtns = document.querySelectorAll('.btn-edit');
    const deleteBtns = document.querySelectorAll('.btn-delete');

    editBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Edit functionality would be implemented here');
        });
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this item?')) {
                alert('Delete functionality would be implemented here');
            }
        });
    });

    // Content editor functionality
    const contentTabBtns = document.querySelectorAll('.content-tab-btn');
    const contentTabs = document.querySelectorAll('.content-tab');
    const editFields = document.querySelectorAll('.edit-field');
    const saveContentBtns = document.querySelectorAll('.save-content-btn');
    const contentMessage = document.getElementById('contentMessage');

    // Load saved content on page load
    function loadSavedContent() {
        editFields.forEach(field => {
            const fieldName = field.getAttribute('data-field');
            const savedValue = localStorage.getItem(`userContent_${fieldName}`);
            if (savedValue) {
                field.value = savedValue;
            }
        });
    }

    // Load content when dashboard loads
    loadSavedContent();

    // Content tab switching
    contentTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Remove active class from all buttons and tabs
            contentTabBtns.forEach(b => b.classList.remove('active'));
            contentTabs.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked button and corresponding tab
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Save content functionality
    saveContentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            const fieldsToSave = {};
            let hasChanges = false;

            // Get all fields in the current tab
            const activeTab = document.querySelector('.content-tab.active');
            const fieldsInTab = activeTab.querySelectorAll('.edit-field');

            fieldsInTab.forEach(field => {
                const fieldName = field.getAttribute('data-field');
                const value = field.value.trim();
                
                if (value) {
                    fieldsToSave[fieldName] = value;
                    localStorage.setItem(`userContent_${fieldName}`, value);
                    hasChanges = true;
                }
            });

            // Show success message
            if (hasChanges) {
                showContentMessage(`${section.charAt(0).toUpperCase() + section.slice(1)} content saved successfully!`, 'success');
            } else {
                showContentMessage('No changes to save.', 'error');
            }

            // Scroll to message
            contentMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    function showContentMessage(message, type) {
        contentMessage.textContent = message;
        contentMessage.className = `content-message ${type}`;
        
        setTimeout(() => {
            contentMessage.className = 'content-message';
        }, 3000);
    }

    // Settings form save
    const settingsBtns = document.querySelectorAll('.settings-form .btn-primary');
    settingsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Settings saved! (This would be saved to database in real app)');
        });
    });

    // Content editor save
    // Handled above with new tab-based editor

    // Maintenance buttons
    const maintenanceBtns = document.querySelectorAll('.maintenance-card .btn-primary');
    maintenanceBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.closest('.maintenance-card').querySelector('h3').textContent.trim();
            alert(action + ' operation started...');
        });
    });

    // Make dashboard first section active on load
    const firstNavLink = document.querySelector('.nav-link.active');
    if (firstNavLink) {
        firstNavLink.click();
    }
}
