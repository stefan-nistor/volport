export const countVolunteersByDepartment = (volunteers, department) => {
  let count = 0;
  for (let i = 0; i < volunteers.length; i++) {
    if (volunteers[i].department === department) {
      count++;
    }
  }
  return count;
}