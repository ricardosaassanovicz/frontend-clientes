import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import ListaClientes from './pages/ListaClientes'
import Cliente from './pages/Cliente'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path='/' exact component={ListaClientes} />
            <Route path='/:msg' exact component={ListaClientes} />
            <Route path='/cliente/:cliente_id' exact component={Cliente} />
        </BrowserRouter>
    )
}