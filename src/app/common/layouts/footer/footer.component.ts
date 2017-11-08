import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';

@Component({
    selector: 'footer',
    templateUrl: './app/common/layouts/footer/footer.component.html',
    styleUrls: [
        './app/common/layouts/footer/footer.component.css'
    ]
})

export class FooterComponent
{
    public isFooter: boolean = false;
    public skillList: any = [
        {
            section: 'web',
            skills: [
                {
                    logo: 'html5',
                    link: 'https://en.wikipedia.org/wiki/HTML5',
                    'tool-tip': 'HTML5'
                },
                {
                    logo: 'javascript',
                    'class': 'logo-narrow',
                    link: 'https://en.wikipedia.org/wiki/JavaScript',
                    'tool-tip': 'JavaScript'
                },
                {
                    logo: 'css3',
                    'class': 'logo-narrow',
                    link: 'https://en.wikipedia.org/wiki/Cascading_Style_Sheets',
                    'tool-tip': 'CSS'
                }
            ]
        },
        {
            section: 'languages',
            skills: [
                {
                    logo: 'php',
                    link: 'https://en.wikipedia.org/wiki/PHP',
                    'tool-tip': 'PHP'
                },
                {
                    logo: 'typescript',
                    link: 'https://en.wikipedia.org/wiki/TypeScript',
                    'tool-tip': 'TypeScript'
                },
                {
                    logo: 'perl',
                    link: 'https://en.wikipedia.org/wiki/Perl',
                    'tool-tip': 'Perl'
                },
                {
                    logo: 'python',
                    link: 'https://en.wikipedia.org/wiki/Python_(programming_language)',
                    'tool-tip': 'Python'
                },
                {
                    logo: 'foxpro',
                    link: 'https://en.wikipedia.org/wiki/Visual_FoxPro',
                    'tool-tip': 'FoxPro'
                }
            ]
        },
        {
            section: 'frameworks-and-libraries',
            skills: [
                {
                    logo: 'laravel',
                    'class': 'logo-wide',
                    link: 'https://en.wikipedia.org/wiki/Laravel',
                    'tool-tip': 'Laravel'
                },
                {
                    logo: 'angular',
                    link: 'https://en.wikipedia.org/wiki/Angular_(application_platform)',
                    'tool-tip': 'Angular'
                },
                {
                    logo: 'bootstrap',
                    link: 'https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)',
                    'tool-tip': 'Bootstrap'
                },
                {
                    logo: 'jquery',
                    link: 'https://en.wikipedia.org/wiki/JQuery',
                    'tool-tip': 'jQuery'
                }
            ]
        },
        {
            section: 'database',
            skills: [
                {
                    logo: 'mysql',
                    link: 'https://en.wikipedia.org/wiki/MySQL',
                    'tool-tip': 'MySQL'
                },
                {
                    logo: 'mariadb',
                    'class': 'logo-wide',
                    link: 'https://en.wikipedia.org/wiki/MariaDB',
                    'tool-tip': 'MariaDB'
                },
                {
                    logo: 'postgresql',
                    link: 'https://en.wikipedia.org/wiki/PostgreSQL',
                    'tool-tip': 'PostgreSQL'
                }
            ]
        },
        {
            section: 'version-control',
            skills: [
                {
                    logo: 'github',
                    link: 'https://en.wikipedia.org/wiki/GitHub',
                    'tool-tip': 'GitHub'
                },
                {
                    logo: 'git',
                    link: 'https://en.wikipedia.org/wiki/Git',
                    'tool-tip': 'Git'
                },
                {
                    logo: 'svn',
                    link: 'https://en.wikipedia.org/wiki/Apache_Subversion',
                    'tool-tip': 'Apache Subversion'
                },
                {
                    logo: 'cvs',
                    link: 'https://en.wikipedia.org/wiki/Concurrent_Versions_System',
                    'tool-tip': 'Concurrent Versions System'
                }
            ]
        },
        {
            section: 'system',
            skills: [
                {
                    logo: 'linux',
                    link: 'https://en.wikipedia.org/wiki/Linux',
                    'tool-tip': 'Linux'
                },
                {
                    logo: 'apache',
                    'class': 'logo-wide',
                    link: 'https://en.wikipedia.org/wiki/Apache_HTTP_Server',
                    'tool-tip': 'Apache HTTP Server'
                },
                {
                    logo: 'shell',
                    link: 'https://en.wikipedia.org/wiki/Shell_script',
                    'tool-tip': 'Shell script'
                }
            ]
        }
    ];

    constructor (
        private _globalEventsManager: GlobalEventsManager
    )
    {
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showFooterEmitter
            .subscribe((isFooter) => {
                this.isFooter = isFooter;
            }
        );
    }

    //**************************************************************************

    public onClick(skill: string)
    {
    }

    //**************************************************************************

}
