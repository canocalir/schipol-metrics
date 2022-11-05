const DelayData = ({data}) => {

  return (
    <div>
        {data.map((delay) => {
            return <div>{delay.medianDelay}</div>
        })}
    </div>
  )
}

export default DelayData