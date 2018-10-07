
import { storiesOf } from '@storybook/react';

import AreaChart from '../widgets/AreaChart/AreaChart.story';
import BubbleWorldMap from '../widgets/BubbleWorldMap/BubbleWorldMap.story';
import GaugeChart from '../widgets/GaugeChart/GaugeChart.story';
import Value from '../widgets/Value/Value.story';

storiesOf('Widgets', module)
  .add('AreaChart', AreaChart)
  .add('BubbleWorldMap', BubbleWorldMap)
  .add('GaugeChart', GaugeChart)
  .add('Value', Value);
