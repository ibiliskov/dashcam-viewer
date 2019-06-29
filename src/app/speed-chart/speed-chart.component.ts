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
  @Input() maxSpeed: number
  speedValue: am4core.Label
  constructor () {}

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.maxSpeed) {
      if (this.logs) {
        this.createSpeedMeterChart()
        this.logs = []
      }
    }
    if (changes.log && changes.log.currentValue && this.maxSpeed) {
      this.hand.showValue(this.log.speed, 1000, am4core.ease.linear)
      this.speedValue.text = Math.floor(this.log.speed).toString()
    }
  }

  createSpeedMeterChart (): void {
    const chart = am4core.create('chartdiv', am4charts.GaugeChart)
    chart.fontSize = 12
    chart.hiddenState.properties.opacity = 0
    chart.innerRadius = -10
    chart.startAngle = -210
    chart.endAngle = 30
    const axis = chart.xAxes.push(new am4charts.ValueAxis() as any)
    axis.min = 0
    axis.max = this.maxSpeed > 220 ? this.maxSpeed - this.maxSpeed % 10 + 10 : 220
    axis.renderer.minGridDistance = 10
    axis.strictMinMax = true
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor('background')
    axis.renderer.grid.template.strokeOpacity = 0.3

    axis.renderer.labels.template.adapter.add(
      'text',
      (speedchartLabelValueDefault): string => {
        const speedchartNumberValue = parseInt(speedchartLabelValueDefault)

        return speedchartNumberValue === 0 || speedchartNumberValue / 10 % 2 === 1 || speedchartNumberValue === axis.max
          ? speedchartLabelValueDefault
          : ''
      }
    )

    const range0 = axis.axisRanges.create()
    range0.value = 0
    range0.endValue = 49
    range0.axisFill.fillOpacity = 1
    range0.axisFill.fill = am4core.color('#4CAF50')
    range0.axisFill.zIndex = -1

    const range1 = axis.axisRanges.create()
    range1.value = 50
    range1.endValue = 51
    range1.axisFill.fillOpacity = 1
    range1.axisFill.fill = am4core.color('#D32F2F')
    range1.axisFill.zIndex = -1

    const range2 = axis.axisRanges.create()
    range2.value = 52
    range2.endValue = 90
    range2.axisFill.fillOpacity = 1
    range2.axisFill.fill = am4core.color('#4CAF50')
    range2.axisFill.zIndex = -1

    const range3 = axis.axisRanges.create()
    range3.value = 90
    range3.endValue = 130
    range3.axisFill.fillOpacity = 1
    range3.axisFill.fill = am4core.color('#FFEE58')
    range3.axisFill.zIndex = -1

    const range4 = axis.axisRanges.create()
    range4.value = 130
    range4.endValue = axis.max
    range4.axisFill.fillOpacity = 1
    range4.axisFill.fill = am4core.color('#FFCA28')
    range4.axisFill.zIndex = -1

    this.speedValue = chart.radarContainer.createChild(am4core.Label)
    this.speedValue.isMeasured = false
    this.speedValue.fontSize = 40
    this.speedValue.x = am4core.percent(50)
    this.speedValue.y = am4core.percent(100)
    this.speedValue.horizontalCenter = 'middle'
    this.speedValue.verticalCenter = 'bottom'
    this.speedValue.text = '0'

    const speedUnit = chart.radarContainer.createChild(am4core.Label)
    speedUnit.isMeasured = false
    speedUnit.fontSize = 15
    speedUnit.x = am4core.percent(50)
    speedUnit.y = am4core.percent(100)
    speedUnit.horizontalCenter = 'middle'
    speedUnit.verticalCenter = 'top'
    speedUnit.text = 'km/h'

    this.hand = chart.hands.push(new am4charts.ClockHand())
    this.hand.value = 0

    this.hand.pin.disabled = true
    this.hand.startWidth = 1
    this.hand.innerRadius = am4core.percent(60)
    this.hand.radius = am4core.percent(95)
  }
}
