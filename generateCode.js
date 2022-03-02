const separateChr = (str) => {
	const vowels = ['a', 'e', 'i', 'o', 'u'];
	const alphabetLst = [];
	const vowelLst = [];
	str
		.toLowerCase()
		.split('')
		.forEach((chr) => {
			if (vowels.includes(chr)) {
				vowelLst.push(chr);
			} else {
				alphabetLst.push(chr);
			}
		});

	return { alphabetLst, vowelLst };
};

const generateByName = (key, value) => {
	const { alphabetLst, vowelLst } = separateChr(value);
	if (key === 'name' && alphabetLst.length > 3) {
		alphabetLst.splice(1, 1);
	}
	if (alphabetLst.length < 3) {
		if (alphabetLst.length + vowelLst.length >= 3) {
			vowelLst.length = 3 - alphabetLst.length;
			return alphabetLst.join('') + vowelLst.join('');
		}
		return (alphabetLst.join('') + vowelLst.join('')).padEnd(3, 'x');
	}
	return alphabetLst.join('').substr(0, 3);
};

const generateByDate = (gender, birthdate) => {
	const months = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
	const dateArr = birthdate.split('/');
	let genderCode = dateArr[0];
	if (gender === 'M') {
		if (dateArr[0] < 10) {
			genderCode = '0' + dateArr[0];
		}
	} else {
		genderCode = dateArr[0] + 40;
	}
	return dateArr[2].substr(2) + months[dateArr[1] - 1] + genderCode;
};

const generateCode = (people) => {
	const { name, surname, gender, birthdate } = people;
	const nameRegex = /^[a-zA-Z]*$/;

	if (!nameRegex.test(name)) {
		console.log(`name must is english letter`);
		return;
	}

	if (name.length < 2) {
		console.log(`name must more than 2 char`);
		return;
	}

	if (!nameRegex.test(surname)) {
		console.log(`surname must is english letter`);
		return;
	}

	if (surname.length < 2) {
		console.log(`surname must more than 2 char`);
		return;
	}

	if (!['M', 'F'].includes(gender)) {
		console.log('invalid gender');
		return;
	}

	const dateRegex = /([1-9]|2\d|3[01])\/([1-9]|1[0-2])\/(19|20)\d{2}$/;
	if (!dateRegex.test(birthdate)) {
		console.log('invalid date format');
		return;
	}

	const codeBySurname = generateByName('surname', surname);
	const codeByName = generateByName('name', name);
	const codeByGenderAndBirthdate = generateByDate(gender, birthdate);

	return `${codeBySurname}${codeByName}${codeByGenderAndBirthdate}`.toUpperCase();
};

const code = generateCode({
	name: 'Somchai',
	surname: 'Thomson',
	gender: 'M',
	birthdate: '1/1/1900',
});

console.log(code);
