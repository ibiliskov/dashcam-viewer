import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import am4themesDark from '@amcharts/amcharts4/themes/dark'

import { LogStamp } from '../log-stamp'

am4core.useTheme(am4themesDark)
am4core.useTheme(am4themesAnimated)

@Component({
  selector: 'app-speed-chart',
  templateUrl: './speed-chart.component.html',
  styleUrls: ['./speed-chart.component.scss'],
})
export class SpeedChartComponent implements OnChanges {
  hand: am4charts.ClockHand
  @Input() log: LogStamp
  @Input() logs: LogStamp[]
  constructor () {}

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.logs) {
      if (this.logs) {
        this.createSpeedMeterChart()
        this.logs = []
      }
    }
    if (changes.log && changes.log.currentValue) {
      this.hand.showValue(this.log.speed, 1000, am4core.ease.cubicOut)
    }
  }

  createSpeedMeterChart (): void {
    const chart = am4core.create('chartdiv', am4charts.GaugeChart)
    chart.hiddenState.properties.opacity = 0
    chart.innerRadius = -15
    const axis = chart.xAxes.push(new am4charts.ValueAxis() as any)
    axis.min = 0
    axis.max = 180
    axis.strictMinMax = true
    axis.renderer.grid.template.stroke = am4core.color('white')
    axis.renderer.grid.template.strokeOpacity = 0.5

    const colorSet = new am4core.ColorSet()

    const range0 = axis.axisRanges.create()
    range0.value = 0
    range0.endValue = 60
    range0.axisFill.fillOpacity = 1
    range0.axisFill.fill = colorSet.getIndex(0)
    range0.axisFill.zIndex = -1

    const range1 = axis.axisRanges.create()
    range1.value = 60
    range1.endValue = 120
    range1.axisFill.fillOpacity = 1
    range1.axisFill.fill = colorSet.getIndex(2)
    range1.axisFill.zIndex = -1

    const range2 = axis.axisRanges.create()
    range2.value = 120
    range2.endValue = 180
    range2.axisFill.fillOpacity = 1
    range2.axisFill.fill = colorSet.getIndex(4)
    range2.axisFill.zIndex = -1
    this.hand = chart.hands.push(new am4charts.ClockHand())
  }
}
