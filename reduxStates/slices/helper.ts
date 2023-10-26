import { BookType } from './bookSlice';
import { librarySectionType } from './librarySlice';

const sortByField = (array: any, fieldName: string) => {
  return [...array].sort((a, b) => {
    const fieldA = a[fieldName].toLowerCase();
    const fieldB = b[fieldName].toLowerCase();

    if (fieldA < fieldB) {
      return -1;
    } else if (fieldA > fieldB) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const handleSort = (library: BookType[], sortBy: 'author' | 'title') => {
  const fieldName = sortBy === 'author' ? 'author' : 'title';

  let sortedLibrary = sortByField(library, fieldName);

  const sections: librarySectionType[] = [];
  const sortSectionLetters: string[] = [];

  if (fieldName === 'author') {
    sortedLibrary.forEach((item: BookType) => {
      const authorsList = item.author.split(',').map((author) => author.trim());
  
      const firstAuthor = authorsList[0].split(' ');
      let surname = '';
  
      for(let i = 0; i < firstAuthor.length; i++) {
        if (firstAuthor[i].startsWith('(')) {
          if (i > 0) {
            surname = firstAuthor[i - 1];
          }
          break;
        }
      }
  
      if (!surname) {
        surname = firstAuthor[firstAuthor.length - 1];
      }
  
      const firstLetter = surname.charAt(0).toUpperCase();
      // find the section coresponding to the first letter or create a new one
      const sectionIndex = sections.findIndex((section) => section.title === firstLetter);
      if (sectionIndex === -1) {
        sections.push({ title: firstLetter, data: [item] });
        sortSectionLetters.push(firstLetter);
      } else {
        sections[sectionIndex].data.push(item);
      }
    });
  
    // sort sections alphabetically based on section title
    sections.sort((a, b) => a.title.localeCompare(b.title));
    sortSectionLetters.sort((a, b) => a.localeCompare(b));  
  } else {
    sortedLibrary.forEach((item: BookType) => {
      const fieldValue =  item.title;   
      const firstLetter = fieldValue.charAt(0).toUpperCase();
  
      // Find the section corresponding to the first letter or create a new one
      const sectionIndex = sections.findIndex((section) => section.title === firstLetter);
      if (sectionIndex === -1) {
        sections.push({ title: firstLetter, data: [item] });
        sortSectionLetters.push(firstLetter);
      } else {
        sections[sectionIndex].data.push(item);
      }
    });
  
    // Sort sections alphabetically based on the section title
    sections.sort((a, b) => a.title.localeCompare(b.title));
    sortSectionLetters.sort((a, b) => a.localeCompare(b));
  }

   // Return the sorted sections and section letters
  return { sortedSections: sections, sectionLetters: sortSectionLetters };
};

// export const handleSortByAuthor = (library: BookType[]) => {
//   let sortedLibrary = sortByField(library, 'author');
  
//   const sections: LibrarySectionType[] = [];
//   const sortSectionLetters: string[] = [];

//   sortedLibrary.forEach((item: BookType) => {
//     const authorsList = item.author.split(',').map((author) => author.trim());

//     const firstAuthor = authorsList[0].split(' ');
//     let surname = '';

//     for(let i = 0; i < firstAuthor.length; i++) {
//       if (firstAuthor[i].startsWith('(')) {
//         if (i > 0) {
//           surname = firstAuthor[i - 1];
//         }
//         break;
//       }
//     }

//     if (!surname) {
//       surname = firstAuthor[firstAuthor.length - 1];
//     }

//     const firstLetter = surname.charAt(0).toUpperCase();
//     // find the section coresponding to the first letter or create a new one
//     const sectionIndex = sections.findIndex((section) => section.title === firstLetter);
//     if (sectionIndex === -1) {
//       sections.push({ title: firstLetter, data: [item] });
//       sortSectionLetters.push(firstLetter);
//     } else {
//       sections[sectionIndex].data.push(item);
//     }
//   });

//   // sort sections alphabetically based on section title
//   sections.sort((a, b) => a.title.localeCompare(b.title));
//   sortSectionLetters.sort((a, b) => a.localeCompare(b));

//   return { sortedSections: sections, sectionLetters: sortSectionLetters }
// }
