export const setTheme = (theme: string) => {
    switch(theme){
        case 'light':
            document.documentElement.style.setProperty('--primary-color', 'rgb(255,255,255)')
            document.documentElement.style.setProperty('--secondary-color', 'rgb(0,0,0)')
            document.documentElement.style.setProperty('--primary-text-color', 'rgb(0,0,0)')
            document.documentElement.style.setProperty('--titlebar-color', 'rgb(241,245,249)')
            document.documentElement.style.setProperty('--tab-text-color', 'rgb(0,0,0)')
            return
        case 'dark':
            document.documentElement.style.setProperty('--primary-color', 'rgb(0,0,0)')
            document.documentElement.style.setProperty('--secondary-color', 'rgb(255,255,255)')
            document.documentElement.style.setProperty('--primary-text-color', 'rgb(255,255,255)')
            document.documentElement.style.setProperty('--titlebar-color', 'rgb(24,24,27)')
            document.documentElement.style.setProperty('--tab-text-color', '#abb2bf')
            return
    }
}