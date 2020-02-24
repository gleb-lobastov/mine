import React from 'react';
import { storiesOf } from '@storybook/react';

import Suggest from './Suggest';

const suggestions = [
  { label: 'Neida Duplantis' },
  { label: 'Kelvin Kocsis' },
  { label: 'Kali Swett' },
  { label: 'Clarinda Evenson' },
  { label: 'Vanna Montalvo' },
  { label: 'Andy Cammack' },
  { label: 'Marilee Mcmaster' },
  { label: 'Dorothea Orduna' },
  { label: 'Kacy Nesbit' },
  { label: 'Valery Gan' },
  { label: 'Izetta Canova' },
  { label: 'Eliana Star' },
  { label: 'Tenisha Barroso' },
  { label: 'Karry Houge' },
  { label: 'Ruben Friedt' },
  { label: 'Jamal Dorgan' },
  { label: 'Wendell Carlsen' },
  { label: 'Mindy Machen' },
  { label: 'Alverta Divis' },
  { label: 'Kiara Newby' },
  { label: 'Vanessa Bibler' },
  { label: 'Long Childs' },
  { label: 'Eldora Barwick' },
  { label: 'Hettie Mcgaugh' },
  { label: 'Hilton Lambeth' },
  { label: 'Elenora Burdo' },
  { label: 'Shandra Lauderdale' },
  { label: 'Marti Digiovanni' },
  { label: 'Blanch Ochoa' },
  { label: 'Jeanne Kinoshita' },
  { label: 'Eleonor Brand' },
  { label: 'Nidia Lucier' },
  { label: 'Clemente Swilley' },
  { label: 'Jeremiah Brickey' },
  { label: 'Margarete Neher' },
  { label: 'Chiquita Winkelman' },
  { label: 'Wilbert Broomfield' },
  { label: 'Karlyn Beddingfield' },
  { label: 'Florentina Penn' },
  { label: 'Tamika Aho' },
  { label: 'Roscoe Catalfamo' },
  { label: 'Mayra Sulser' },
  { label: 'Annmarie Moring' },
  { label: 'Christene Grubbs' },
  { label: 'Wanetta Mccourt' },
  { label: 'Laurel Schwer' },
  { label: 'Riley Gifford' },
  { label: 'Lang Lagrange' },
  { label: 'Sang Cousin' },
  { label: 'Shanika Bryne' },
];

storiesOf('Suggest', module).add('default', () => (
  <Suggest
    sourceProps={{ suggestions }}
    inputProps={{ placeholder: 'Start typing here...' }}
  />
));
