import { Fragment } from 'react/jsx-runtime'
import { DateRangeSelector } from './DateRangeSelector'
import DefaultRange from './DefaultRange'

function ShareGraphSetting() {
  return (
    <Fragment>
      <div className="flex flex-col gap-5">
          <label className="text-sm block">Date ranges and intervals</label>
        <DateRangeSelector />
      </div>
      <div className="flex flex-col gap-5">
        <label className="text-sm block">Default range</label>
        <DefaultRange />
      </div>
    </Fragment>
  )
}

export default ShareGraphSetting;