/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
		"Одержимость",
        "Логан",
        "Лига справедливости",
		"Скотт Пилигрим против...",
        "Ла-ла лэнд",
    ]
};

document.addEventListener('DOMContentLoaded', function() {
	const promoImgList = document.querySelectorAll('.promo__adv img'),
		  genre = document.querySelector('.promo__bg .promo__genre'),
		  promoBackground = document.querySelector('.promo .promo__bg'),
		  filmList = document.querySelector('.promo__interactive-list'),
		  form = document.querySelector('.add'),
		  input = form.querySelector('.adding__input'),
		  checkbox = form.querySelector(' [type="checkbox"] '),
		  deleteItemList = document.querySelectorAll('.delete');

	function deleteList(list) {
		list.forEach(elem => {
			elem.remove();
		})
	}
	
	deleteList(promoImgList);

	function makeChanges() {
		genre.textContent = 'драма';
		promoBackground.style.backgroundImage = 'url("img/bg.jpg")';
	}

	makeChanges();

	function createList(arr, list) {
		filmList.innerHTML = '';
		arr.sort();
		arr.forEach((elem, index) => {
			list.innerHTML += `
			<li class="promo__interactive-item">${index + 1}. ${elem}
				<div class="delete"></div>
			</li>
			`;
		})

		document.querySelectorAll('.delete').forEach((btn, i) => {
			btn.addEventListener('click', () => {
				arr.splice(i, 1);
				createList(arr, list);
			})
		})
	}
	
	createList(movieDB.movies, filmList);

	function addingFilm(event) {
		event.preventDefault();

		let newFilm;
		const favorite = checkbox.checked;

		if (input.value) {
			if (favorite) {
				console.log('Добавляем любимый фильм');
			}
			function filmNameTest() {
				if (input.value.length > 21) {
					return `${input.value.slice(0, 21)}...`
				} else {
					return input.value;
				}
			}
			newFilm = filmNameTest();
			newFilm = newFilm[0].toUpperCase() + newFilm.slice(1, newFilm.length).toLowerCase();
	
			movieDB.movies.push(newFilm);
	
			createList(movieDB.movies, filmList);
		}

		event.target.reset();
	}

	form.addEventListener('submit', addingFilm);


})

/*

	<li class="promo__interactive-item">ЛОГАН
	    <div class="delete"></div>
	</li>

*/