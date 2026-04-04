export const formatDate=(dataString)=>{
  const option={year:"numeric",month:"long",day:"numeric"}
  const date=new Date(dateString)
  const formatteDate=date.toLocaleDateString("en-US",option)
  const hour=date.getHours()
  const minuts=date.getMinutes()
  const period=hour>=12 ? "PM":"AM"
  const formattedTime=`${hour %12}:${getMinutes
    .toString()
    .padStart(2,"0")} ${period}`
    return `${formatteDate} | ${formattedTime}`
  }
