import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import './FlexText.css';

const ALIGN_MAPPING = {
  center: 'center',
  top: 'flex-start',
  bottom: 'flex-end',
  left: 'flex-start',
  right: 'flex-end',
};


class FlexText extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    unit: PropTypes.string,
    additionalValue: PropTypes.string,
    /* eslint-disable react/forbid-prop-types */
    style: PropTypes.object,
    verticalAlign: PropTypes.string,
    horizontalAlign: PropTypes.string,
  }

  static defaultProps = {
    value: undefined,
    unit: undefined,
    additionalValue: undefined,
    style: undefined,
    verticalAlign: 'center',
    horizontalAlign: 'center',
  }

  constructor() {
    super();
    this.state = {
      fontSize: undefined,
      secondFontSize: undefined,
    };
    this.updateFontSize = this.updateFontSize.bind(this);
    this.valueStyle = this.valueStyle.bind(this);
    this.additionalValueStyle = this.additionalValueStyle.bind(this);
  }

  componentDidUpdate() {
    this.updateFontSize(this.container);
  }

  updateFontSize(container) {
    if (container) {
      const { additionalValue } = this.props;
      const reference = container.querySelector('.dashli-flex-text-reference');
      this.container = container;
      if (container) {
        const heightFactor = container.offsetHeight / (additionalValue ? 60 : 40);
        const widthFactor = container.offsetWidth / reference.offsetWidth * 0.95;

        const factor = Math.min(heightFactor, widthFactor);
        this.setState({
          fontSize: `${Math.floor(40 * factor)}px`,
          secondFontSize: `${Math.floor(20 * factor)}px`,
        });
      }
    }
  }

  valueStyle() {
    const {
      additionalValue,
      verticalAlign,
      horizontalAlign,
    } = this.props;

    const { fontSize, secondFontSize } = this.state;

    let style = {
      fontSize,
      lineHeight: fontSize,
      justifyContent: ALIGN_MAPPING[horizontalAlign],
      alignItems: ALIGN_MAPPING[verticalAlign],
    };

    if (verticalAlign === 'center' && additionalValue) {
      style = { ...style, alignItems: ALIGN_MAPPING.bottom, paddingTop: secondFontSize };
    }

    if (verticalAlign === 'top' && additionalValue) {
      style = { ...style, flexGrow: 0 };
    }

    return style;
  }

  additionalValueStyle() {
    const {
      verticalAlign,
      horizontalAlign,
    } = this.props;

    const { secondFontSize } = this.state;

    let style = {
      fontSize: secondFontSize,
      justifyContent: ALIGN_MAPPING[horizontalAlign],
      alignItems: ALIGN_MAPPING[verticalAlign],
    };

    if (verticalAlign === 'center') {
      style = { ...style, alignItems: ALIGN_MAPPING.top };
    }

    if (verticalAlign === 'bottom') {
      style = { ...style, flexGrow: 0 };
    }

    return style;
  }

  render() {
    const {
      value,
      unit,
      additionalValue,
      style,
    } = this.props;
    const { fontSize, secondFontSize } = this.state;
    return (
      <div className="dashli-flex-text" style={style} ref={this.updateFontSize}>
        { fontSize ? (
          <div className="dashli-flex-text-value" style={this.valueStyle()}>
            <div>
              <span>{value}</span>
              <span className="dashli-flex-text-unit" style={{ fontSize: secondFontSize, lineHeight: secondFontSize }}>{unit}</span>
            </div>
          </div>
        ) : undefined }
        { additionalValue && secondFontSize ? (
          <div className="dashli-flex-text-additional-value" style={this.additionalValueStyle()}>{additionalValue}</div>
        ) : undefined }
        <div className="dashli-flex-text-reference">
          <div className="dashli-flex-text-value">
            <div>
              <span>{value}</span>
              <span className="dashli-flex-text-unit">{unit}</span>
            </div>
          </div>
          { additionalValue ? (
            <div className="dashli-flex-text-additional-value">{additionalValue}</div>
          ) : undefined }
        </div>
      </div>
    );
  }
}

export default FlexText;