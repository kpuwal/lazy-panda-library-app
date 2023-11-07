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

  let sections: librarySectionType[] = [];
  const sortSectionLetters: string[] = [];
  const sortedAuthorSurnames: string[] = [];

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

      sortedAuthorSurnames.push(surname);
  
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
  // console.log(sections)
    // sort sections alphabetically based on section title
    sections.sort((a, b) => a.title.localeCompare(b.title));
    sections = sortDataItemsBySurname(sections)
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

// Function to sort "data" items within each section based on the surnames of first authors
function sortDataItemsBySurname(sections: librarySectionType[]) {
  sections.forEach((section) => {
    section.data.sort((a, b) => {
      const surnameA = a.author
      .split(',')
      .map((author) => author.trim())
      .map((authorsList) => {
        const nameParts = authorsList.split(' ');
        return nameParts[nameParts.length - 1]; // Get the last part, which is the surname
      })
      .map((name) => name.replace('(', ''))[0]; // Remove any parentheses if present
    
      const surnameB = b.author
      .split(',')
      .map((author) => author.trim())
      .map((authorsList) => {
        const nameParts = authorsList.split(' ');
        return nameParts[nameParts.length - 1]; // Get the last part, which is the surname
      })
      .map((name) => name.replace('(', ''))[0]; // Remove any parentheses if present

      const comparison =  surnameA.localeCompare(surnameB);
      return comparison
    });
  });

  return sections;
}

export function searchLibrary(query: string, library: BookType[]) {
    return library.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(query.toLowerCase());
      const authorMatch = book.author.toLowerCase().includes(query.toLowerCase());
      
      return titleMatch || authorMatch;
    });
}
