import { Injectable } from '@angular/core';

const mock = {
    'items': [
        {
            path: '/management/dashboard"',
            title: 'Dashboard',
            type: 'link',
            icontype: '<i class="material-icons">insert_chart</i>',
            role: 'DEMAND.SEARCH'
        },
        {
            path: '/admin',
            title: 'Exemplo',
            type: 'link',
            icontype: '<i class="material-icons">note_add</i>',
            role: 'SCRIPT.SEARCH'
        },
        {
            path: '/admin',
            title: 'Exemplo 2',
            type: 'link',
            icontype: '<i class="material-icons">person_add</i>',
            role: 'APPROVAL.SEARCH'
        },
        {
            path: '/',
            title: 'Exemplo 3',
            type: 'link',
            icontype: '<i class="material-icons">bookmarks</i>',
            role: 'APPROVAL.SEARCH'
        },
        {
            path: '/admin',
            title: 'Exemplo 4',
            type: 'link',
            icontype: '<i class="material-icons">date_range</i>',
            role: 'APPROVAL.SEARCH'
        },
        {
            path: '/admin',
            title: 'Cadastros',
            type: 'link',
            icontype: '<i class="material-icons">settings_applications</i>',
            role: 'APPROVAL.SEARCH'
        },
        {
            path: '/admin',
            title: 'Perfil',
            type: 'link',
            icontype: '<i class="material-icons">perm_identity</i>',
            role: 'APPROVAL.SEARCH'
        },

    ]
};

@Injectable()
export class MenuItems {
    getAll(): any {
        return mock;
    }
}
