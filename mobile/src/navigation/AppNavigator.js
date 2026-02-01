import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import WalletTopUpScreen from '../screens/WalletTopUpScreen';
import RatesScreen from '../screens/RatesScreen';
import HistoryScreen from '../screens/HistoryScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import TradeScreen from '../screens/AddExpenseScreen';
import BudgetAnalysisScreen from '../screens/BudgetAnalysisScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isLoggedIn, onLogin, onLogout }) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#0B0B0F', // ЧЕРНЫЙ
                  },
                  headerTintColor: '#FF2E93', // РОЗОВЫЙ ТЕКСТ
                  headerTitleStyle: {
                    fontWeight: '900',
                    fontSize: 18,
                    letterSpacing: 1,
                  },
                  headerTitleAlign: 'center',
                  headerShadowVisible: false,
                }}

            >
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen name="Login" options={{ title: 'Finanse osobiste – Zaloguj się' }}>
                            {(props) => <LoginScreen {...props} onLogin={onLogin} />}
                        </Stack.Screen>
                        <Stack.Screen name="Register" options={{ title: 'Utwórz konto' }}>
                            {(props) => <RegisterScreen {...props} />}
                        </Stack.Screen>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Dashboard" options={{ title: 'Finanse osobiste' }}>
                            {(props) => <DashboardScreen {...props} onLogout={onLogout} />}
                        </Stack.Screen>

                        <Stack.Screen
                            name="WalletTopUp"
                            component={WalletTopUpScreen}
                            options={{ title: 'Dodaj przychód' }}
                        />
                        <Stack.Screen
                            name="Trade"
                            component={TradeScreen}
                            options={{ title: 'Transakcje' }}
                        />
                        <Stack.Screen
                            name="Rates"
                            component={RatesScreen}
                            options={{ title: 'Kategorie' }}
                        />
                        <Stack.Screen
                            name="History"
                            component={HistoryScreen}
                            options={{ title: 'Historia Transakcji' }}
                        />
                        <Stack.Screen
                            name="Portfolio"
                            component={PortfolioScreen}
                            options={{ title: 'Budżet i saldo' }}
                        />
                        <Stack.Screen
                            name="BudgetAnalysis"
                            component={BudgetAnalysisScreen}
                            options={{ title: 'Statystyki' }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
