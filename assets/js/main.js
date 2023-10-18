console.log("connected");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const nomorHandphone = document.getElementById("nomor-handphone");
const provinsi = document.getElementById("provinsi");
const kabupaten = document.getElementById("kabupaten/kota");
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");
const passwordError = document.getElementById("passwordError");
const phoneInput = document.getElementById("nomor-handphone");
const phoneError = document.getElementById("nohpError");

let isPasswordVisible = false;

const togglePasswordVisibility = () => {
	if (isPasswordVisible) {
		passwordInput.type = "password";
		togglePasswordButton.setAttribute("src", "/assets/icons/eye.svg");
	} else {
		passwordInput.type = "text";
		togglePasswordButton.setAttribute("src", "/assets/icons/eye-slash.svg");
	}
	isPasswordVisible = !isPasswordVisible;
};

togglePasswordButton.addEventListener("click", () =>
	togglePasswordVisibility()
);

// validate password
const validatePassword = () => {
	const password = passwordInput.value;

	const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

	if (passwordRegex.test(password)) {
		passwordError.textContent = "";
	} else {
		passwordError.textContent =
			"Password must be at least 8 characters and contain letters and numbers.";
	}
};

// validate phone number indonesia
function validatePhoneNumber() {
	const phoneNumber = phoneInput.value.trim();

	const regex = /^(0|62|\+62|62-0|\+62-0)(\d{7,12})$/;

	if (regex.test(phoneNumber)) {
		phoneError.textContent = "";
	} else {
		phoneError.textContent = "Invalid Indonesian phone number.";
	}
}

// validateInput
const validateForm = () => {
	const inputs = [
		{ inputId: "email", errorId: "emailError", type: "text" },
		{ inputId: "nama", errorId: "namaError", type: "text" },
		{ inputId: "nomor-handphone", errorId: "nohpError", type: "number" },
		{ inputId: "provinsi", errorId: "provinsiError", type: "text" },
		{ inputId: "kabupaten/kota", errorId: "kabupatenError", type: "text" },
		{ inputId: "password", errorId: "passwordError", type: "text" },
	];

	let isFormValid = true;

	inputs.forEach((item) => {
		const input = document.getElementById(item.inputId);
		const error = document.getElementById(item.errorId);

		if (input.value.trim() === "") {
			error.textContent = "This field is required.";
			isFormValid = false;
		} else {
			error.textContent = "";
		}

		if (item.type === "number") {
			if (isNaN(input.value)) {
				error.textContent = "Invalid input. Please enter a number.";
				isFormValid = false;
			}
		}
	});

	return isFormValid;
};

const handleSubmit = (event) => {
	if (validateForm()) {
		alert(
			"Form Values:\n" +
				"Nama: " +
				nama.value +
				"\n" +
				"Email: " +
				email.value +
				"\n" +
				"Nomor Handphone: " +
				nomorHandphone.value +
				"\n" +
				"Provinsi: " +
				provinsi.value +
				"\n" +
				"Kabupaten/Kota: " +
				kabupaten.value +
				"\n" +
				"Password: " +
				password.value
		);
	}
};

// provinsi data
const provinsiData = ["jawa tengah", "jawa barat", "jawa timur", "jakarta"];
const kabupatenData = ["Banyumas", "Purwokerto", "Wonogiri", "Boyolali"];

function populateDropdown(optionElementID, inputElementId, type) {
	const optionsEl = document.getElementById(optionElementID);
	const inputEl = document.getElementById(inputElementId);
	let data;

	if (inputEl.value.length === 0) {
		optionsEl.classList.add("hidden");
	} else {
		optionsEl.classList.remove("hidden");
	}

	if (type === "provinsi") {
		data = provinsiData;
	} else {
		data = kabupatenData;
	}

	// Filter options from the array based on the input value
	const filteredOptions = data.filter((option) =>
		option.toLowerCase().includes(inputEl.value)
	);

	optionsEl.addEventListener("click", () => {
		if (type === "provinsi") {
			provinsi.value = optionsEl.textContent;
			optionsEl.classList.add("hidden");
		} else {
			kabupaten.value = optionsEl.textContent;
			optionsEl.classList.add("hidden");
		}
	});
	optionsEl.textContent =
		filteredOptions.length === 0 ? "not found" : filteredOptions[0];
}
