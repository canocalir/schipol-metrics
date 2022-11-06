const DelayData = ({ data }) => {
  
  return (
    <div>
      {data.map(({ medianDelay }) => <div>{medianDelay}</div>)}
    </div>
  )
}

export default DelayData
