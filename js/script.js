import CURSOS from "./cursos.js";

const userCardTemplate = document.querySelector("[data-curso-template]");
const userCardContainer = document.querySelector(
	"[data-curso-cards-container]"
);
const searchInput = document.querySelector("[data-search]");

let cursos = [];

searchInput.addEventListener("input", e => {
	const value = e.target.value.toLowerCase();
	cursos.forEach(curso => {
		const isVisible = curso.title.toLowerCase().includes(value);
		curso.element.classList.toggle("hide", !isVisible);
	});
});

cursos = CURSOS.map(curso => {
	const card = userCardTemplate.content.cloneNode(true).children[0];
	const cardId = card.querySelector("[data-card-id]");
	const header = card.querySelector("[data-header]");
	const imgCourse = card.querySelector("[data-course-img]");
	const body = card.querySelector("[data-body]");
	//Adding unique identifier to each card
	cardId.setAttribute("data-modal-target", curso.id);
	header.textContent = curso.title;
	body.textContent = curso.description.substring(0, 168) + " ...";
	imgCourse.src = curso.image;
	userCardContainer.append(card);
	return { title: curso.title, element: card };
});

/***************************Modals************************************/
const openModalCard = document.querySelectorAll("[data-modal-target]");
const modalTemplate = document.querySelector("[data-curso-modal-template]");
const modalContainer = document.getElementById("dynamicModal");
const overlay = document.getElementById("overlay");

/*
  -Hacer que cada card (curso) sea clickble para mostrar el modal correspondiente
    * Identificar la card con el atributo asignado
    * comparar el id de la card con el id que tengo en el array de cursos
    * Devolver el objeto del array que ha coincidido con el id de la card que el usuario ha seleccionado
  -Selecionar el template del modal y clonarlo
*/

openModalCard.forEach(card => {
	card.addEventListener("click", e => {
		//console.log(e.target.closest("[data-card-id]").dataset.modalTarget); //works
		let selectedCardId =
			e.target.closest("[data-card-id]").dataset.modalTarget;
		const courseToDisplay = CURSOS.filter(
			cursos => cursos.id === selectedCardId
		)[0];

		// console.log(courseToDisplay);
		openModal(courseToDisplay);

		//checking if modal container has children
		// console.log(modalContainer.contains(document.querySelector("[data-id]")));

		//closes modal by clicking the X button
		const closeModalButtons = document.querySelectorAll(
			"[data-close-button]"
		);

		closeModalButtons.forEach(button => {
			button.addEventListener("click", () => {
				const modal = document.querySelector(".modal.active");
				closeModal(modal);
			});
		});
	});
});

//Implementing event delegation for better performace
// userCardContainer.addEventListener("click", e => {
// 	if (e.target && e.target.closest(".card")) {
// 		let selectedCard = e.target.closest("[data-card-id]").dataset.modalTarget;
// 		console.log(selectedCard);
// 	}
// });

overlay.addEventListener("click", () => {
	const modals = document.querySelectorAll(".modal.active");
	modals.forEach(modal => {
		closeModal(modal);
	});
});

function openModal(modalObj) {
	const modal = modalTemplate.content.cloneNode(true).children[0];
	if (modal == null) return;
	// modal.classList.add("active");
	overlay.classList.add("active");

	const modalId = modal.querySelector("[data-id]");
	modalId.classList.add("active");
	const courseTitle = modal.querySelector("[data-course-title]");
	const courseDescription = modal.querySelector("[data-course-description]");
	const courseDate = modal.querySelector("[data-fecha]");
	const courseTime = modal.querySelector("[data-hora]");
	const priceRegular = modal.querySelector("[data-price-regular]");
	const pricePro = modal.querySelector("[data-price-pro]");

	// modalId.setAttribute("data-modal-id", modalObj.id);
	courseTitle.textContent = modalObj.title;
	courseDescription.textContent = modalObj.description;
	courseDate.textContent = modalObj.date;
	courseTime.textContent = modalObj.time;
	priceRegular.textContent = modalObj.price.regular;
	pricePro.textContent = modalObj.price.pro;

	modalContainer.append(modal);
}

function closeModal(modal) {
	if (modal == null) return;
	modal.classList.remove("active");
	overlay.classList.remove("active");
}

/*
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      header.textContent = user.name
      body.textContent = user.email
      userCardContainer.append(card)
      return { name: user.name, email: user.email, element: card }
    })
  })

  //https://www.youtube.com/watch?v=TlP5WIxVirU
*/
