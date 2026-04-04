export const formattedDate=(date)=>{
  return new Date(date).toLocaleDateString("en-US",{
    month:"long",
    day:"numneric",
    year:"numeric",
  })
}