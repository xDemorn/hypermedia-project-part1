# Simple CV
This is the first part of the hypermedia project.

## User profile

I decided to use my current CV and convert it to a HTMl and CSS structure with some Javascript.

I converted only the structure and some content, removing the list only data because it would be too easy and simple just making everything as a list.

## Information architecture

Since I had my CV as a Google Docs I decided to follow the design.

I created a main structure which simulates a page and in every page there is some content.

On the first page there is the header that contains the basic information and some way to contact. Next section contains some information about myself. The following section is displayed as a row, in which there are 2 sections inside as a column. After that there is just a simple text and that would be the end of the first page.

On the second page there are only 2 sections, the first one is a grid of diferent elements, and the second one is just a row with 2 sections inside and that would be the end of the second page.

On the third page there is just one section also displayed as a grid.

## Visual design

There are 3 base colors.

- #f9d9ab for the headers background.
- #f3cc5f for the headers bottom borders.
- #009dff for the links.

The main titles use a font called **Poppins** and the normal text use a font called **Rubik**, both are fonts imported from [Google Fonts](https://fonts.google.com/).

Every header for every section has the basic colors applied.

For the **Academic Training** and **Work Experience** which are displayed as a column, every item of those sections have the left border as the background color of the basic colors. They are separated by a new line and the title is set to use the bold font weight.

The **Technical skills** section are separated by categories and uses a display as a chip element with some hover effect. The chip container is a grid in which it automatically sets the number of columns it needs, based off a minimum value of `150px` and a maximum possible width.

The **Projects** section is also a grid, but the minimum value is `300px`. If there is enough space for more elements they would appear as a row, but if there is not then they appear as a column. Every project has a header with a title, that header has a bottom border and finally after that there is the content of that project.

This is a responsive web. If the `width <= 768px` then the row changes to be a column for better visibility.

## Figma

The [figma project](https://www.figma.com/design/Bs3KunIrHikFfCJzW0SIvZ/Untitled?node-id=4-2&t=JCm1QtU8CHR9rh9d-1) doesn't show a scrollbar, but in the preview mode it is possible to scroll.

>***NOTE***: It is possible to force a language adding at the end of the URL ?lang=ca, the possible values are 'ca' | 'es' | 'ca' | 'pl'.

>***NOTE***: This project was developed in Catalan, but all the translations are made with ChatGPT, they might not be 100% accurate.