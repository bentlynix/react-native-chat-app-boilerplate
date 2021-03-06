import moment from 'moment';
import React, { useContext } from 'react';
import { TextStyle, StyleSheet } from 'react-native';
import ConfigContext from '../../config/AppConfigProvider';
import { AppDateFormats } from '../../config/DefaultConfig';
import ThemedText from '../UI/ThemedText';

interface Props {
    date: Date
}

const getTimeLabel = (date: Date, dateFormats?: AppDateFormats): string => {
    if (moment(date).isSame(moment(), 'day')) {
        return moment(date).format(dateFormats?.chatHourDisplayFormat)
    }

    if (moment(date).isSame(moment().subtract(1, 'day'), 'day')) {
        return dateFormats?.chatYesterdayText
    }

    if (moment(date).isBefore(moment().subtract(1, 'day'))) {
        return moment(date).format(dateFormats?.chatDateFormat)
    }

    return ""
}

const TimeDuration: React.FunctionComponent<Props> = ( {
    date
}: Props ) => {
    const config = useContext(ConfigContext)
    return <ThemedText styleKey="textColor" style={style.text}>{getTimeLabel(date, config.constants?.dateFormats)}</ThemedText>
};

export default TimeDuration;

interface Style {
    text: TextStyle
}

const style: Style = StyleSheet.create<Style>({
    text: {
        fontSize: 10
    }
})
