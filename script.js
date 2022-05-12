let selectedId = null;

const form = document.querySelector('form');


const fileInput = document.querySelector('input[type=file]');


fileInput.addEventListener('change', (event) => {
    if (fileInput.files.length == 0) {
        return;
    }
    const file = fileInput.files[0];
    const img = document.querySelector('form img');
    img.src = URL.createObjectURL(file);
    img.onload = function () {
        URL.revokeObjectURL(img.src)
    };
});

const formReset = () => {
    // reset form
    form.reset();
    selectedId = null;
    document.querySelector('form img').src = 'https://i.pravatar.cc/300';
};

form.addEventListener('reset', (event) => {
    document.querySelector('button[type=submit]').textContent = 'Créer';
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const prenom = document.querySelector('#prenom').value;
    const nom = document.querySelector('#nom').value;
    const group = document.querySelector('#group').value;
    const bio = document.querySelector('#bio').value;
    const img = document.querySelector('form img').src;

    if (selectedId) {
        document.querySelector(`li#${selectedId} .name`).textContent = `${prenom} ${nom}`;
        document.querySelector(`li#${selectedId} .group`).textContent = group;
        document.querySelector(`li#${selectedId} .bio`).textContent = bio;
        let itemImg = document.querySelector(`li#${selectedId} .img-section img`);
        if (fileInput.files.length != 0) {
            const file = fileInput.files[0];
            itemImg.src = URL.createObjectURL(file);
            // itemImg.onload = function () {
            //     URL.revokeObjectURL(itemImg.src)
            // };
        } else {
            itemImg.src = img;
        }
        formReset();
        return;
    }

    const item = document.createElement('li');

    // generate random id and store it to the variable id
    const id = Math.random().toString(36).substring(2, 15);

    item.id = id;

    item.onclick = (event) => {
        if (event.target.classList.contains('close-icon') ||
            event.target.classList.contains('close-img')
        ) return;
        formReset();
        selectedId = id;
        document.querySelector('#prenom').value = prenom;
        document.querySelector('#nom').value = nom;
        document.querySelector('#group').value = group;
        document.querySelector('#bio').value = bio;
        document.querySelector('form img').remove();
        let img = document.querySelector(`li#${id} .img-section img`);
        document.querySelector('.form-file-input').appendChild(img.cloneNode(true));

        document.querySelector('button[type=submit]').textContent = 'Modifier';
    };

    // Close Icon
    const itemCloseIcon = document.createElement('i');
    itemCloseIcon.classList.add('close-icon');
    const itemCloseIconImage = document.createElement('img');
    itemCloseIconImage.src = './icons8-close-24.png';
    // add class close-img to itemCloseIconImage
    itemCloseIconImage.classList.add('close-img');
    itemCloseIcon.appendChild(itemCloseIconImage);

    itemCloseIcon.onclick = (event) => {
        item.remove();
    };

    // Append Close Icon
    item.appendChild(itemCloseIcon);

    // create div with class img-section
    const itemImgSection = document.createElement('div');
    itemImgSection.classList.add('img-section');

    // create img
    const itemImg = document.createElement('img');

    if (fileInput.files.length != 0) {
        const file = fileInput.files[0];
        itemImg.src = URL.createObjectURL(file);
        // itemImg.onload = function () {
        //     URL.revokeObjectURL(itemImg.src)
        // };
    } else {
        itemImg.src = img;
    }

    // append itemImg to itemImgSection
    itemImgSection.appendChild(itemImg);

    // apppend itemImgSection to item
    item.appendChild(itemImgSection);

    // create div with class info-section
    const itemInfoSection = document.createElement('div');
    itemInfoSection.classList.add('info-section');

    // create three p tag and append to itemInfoSection
    const itemInfoP1 = document.createElement('p');
    itemInfoP1.classList.add('name');
    itemInfoP1.textContent = `${prenom} ${nom}`;
    const itemInfoP2 = document.createElement('p');
    itemInfoP2.classList.add('group');
    itemInfoP2.textContent = group;
    const itemInfoP3 = document.createElement('p');
    itemInfoP3.classList.add('bio');
    itemInfoP3.textContent = bio;

    // append itemInfoP1 to itemInfoSection
    itemInfoSection.appendChild(itemInfoP1);
    // append itemInfoP2 to itemInfoSection
    itemInfoSection.appendChild(itemInfoP2);
    // append itemInfoP3 to itemInfoSection
    itemInfoSection.appendChild(itemInfoP3);

    // add itemInfoSection  to item
    item.appendChild(itemInfoSection);


    const ul = document.querySelector('#list ul');
    ul.appendChild(item);

    formReset();
});
