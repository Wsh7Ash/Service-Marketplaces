import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as RNEButton, ButtonProps } from '@rneui/themed';

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<CustomButtonProps> = ({ 
  variant = 'primary',
  containerStyle,
  buttonStyle,
  titleStyle,
  ...props 
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          button: { backgroundColor: '#2089dc' },
          title: { color: '#ffffff' }
        };
      case 'secondary':
        return {
          button: { backgroundColor: '#ffffff' },
          title: { color: '#2089dc' }
        };
      case 'outline':
        return {
          button: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#2089dc' },
          title: { color: '#2089dc' }
        };
      default:
        return {};
    }
  };

  const styles = getButtonStyles();

  return (
    <RNEButton
      {...props}
      containerStyle={[defaultStyles.container, containerStyle]}
      buttonStyle={[defaultStyles.button, styles.button, buttonStyle]}
      titleStyle={[defaultStyles.title, styles.title, titleStyle]}
      raised
    />
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 