
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  global: {
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
  body: {
    margin: 0,
    flex: 1
  },
  /* Estiliza Scrollbar */
  scrollbar: {
    width: 8,
  },
  scrollbarTrack: {
    backgroundColor: '#202020',
    borderRadius: 50,
  },
  scrollbarThumb: {
    backgroundColor: '#ffffff40',
    borderRadius: 50,
  },
  scrollbarThumbHover: {
    backgroundColor: '#ffffff80',
  },
});