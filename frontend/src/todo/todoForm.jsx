import React, { Component } from 'react'
import Grid from '../template/grid'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'

import { add, changeDescription, search, clear } from './todoActions'
class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }
    keyHandler(e) {
        const { add , clear, search ,description} = this.props
        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if (e.key === 'Escape') {
            clear()
        }
    }
    componentWillMount(){
        this.props.search()
    }
    render() {
        const { add ,search ,description} = this.props
        return (
            <div role="form" className='todoForm'>
                <Grid cols='12 9 10'>
                    <input id='description' className='form-control'
                        placeholder='Adicione uma tarefa'
                        onKeyUp={this.keyHandler}
                        // metodo da Todoaction
                        onChange={this.props.changeDescription}
                        value={this.props.description} />
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus'
                        //linkando com o botao add o metodo action add
                        onClick={()=> add(description)}></IconButton>
                    <IconButton style='info' icon='search'
                        onClick={search}></IconButton>
                    <IconButton style="default" icon="close"
                        onClick={this.props.clear}></IconButton>
                </Grid>
            </div>
        )
    }
}


// Mapeia o store do estado redux para o componente 
const mapStateToProps = state => ({ description: state.todo.description })
// faz a ligação entre o evento disparado actioncreators  para os reducers 
const mapDispatchToProps = dispatch => bindActionCreators({ add, changeDescription, search , clear}, dispatch)
// decorator que exporta o componente 
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)