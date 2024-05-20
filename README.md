# Årsoppgave 2

### Forside

Aleksander,  
Toskr uploader,  
2024

## Innholdsfortegnelse
- [Innledning](#innledning)
  - [Prosjektbeskrivelse](#prosjektbeskrivelse)
- [Prosjektplan](#prosjektplan)
- [Dokumentasjon](#dokumentasjon)
  - [Nettverkstegning](#nettverkstegning)
  - [Backup-rutiner](#backup-rutiner)
  - [Teknisk dokumentasjon](#teknisk-dokumentasjon)
    - [Bruker/Passord](#brukerpassord)
    - [IP-adresser + hostname](#ip-adresser--hostname)
    - [Porter](#porter)
    - [Server-funksjon](#server-funksjon)
  - [Brukerveiledninger](#brukerveiledninger)
  - [Relevante lenker](#relevante-lenker)
    - [Github](#github)
    - [Opplæringsmateriale](#opplæringsmateriale)
- [Kartlegging av relevant lovverk](#kartlegging-av-relevant-lovverk)
- [Risikoanalyse og tiltaksplan](#risikoanalyse-og-tiltaksplan)
- [Egenevaluering](#egenevaluering)
  - [Hvilke utfordringer har du støtt på underveis med evt løsninger](#hvilke-utfordringer-har-du-støtt-på-underveis-med-evt-løsninger)
  - [Hva har du lært av arbeid med årsoppgave](#hva-har-du-lært-av-arbeid-med-Årsoppgaven)
  - [Hvordan vurderer du selv arbeidet som er gjort](#hvordan-vurderer-du-selv-arbeidet-som-er-gjort)
  - [Hva tenker du burde vært gjort annerledes?](#hva-tenker-du-burde-være-gjort-annerledes)
- [Kilder](#kilder)

## Innledning

### Prosjektbeskrivelse
Jeg har laget en opplastning/nedlastning nettside der hvor du kan laste opp og laste ned filer.

Du kan også dele dem med andre, slette dem, og se forhåndsvisninger av filene med støttede filtyper slik at man vet hva det er man har lastet opp.

Jeg har også laget en administratorside som man kan gå inn på hvis man har riktig rolle i databasen.

## Prosjektplan
Prosjektet ble gjennomført med følgende milepæler:
1. Utvikling av login-systemet
2. Implementering av filopplastning og -nedlastning
3. Utvikling av admin-funksjonalitet
4. Testing og feilsøking
5. Implementering av sikkerhetsrutiner og backup

Mer detaljer kan finnes på prosjektplanen [her](https://github.com/users/alsta017/projects/2).

## Dokumentasjon

### Nettverkstegning
![Nettverkstegning](https://github.com/alsta017/-rsoppgave-2/tree/main/dokumenter/nettverkstegning.png)

### Backup-rutiner
Har prosjektet på GitHub samt backup i OneDrive.

### Teknisk dokumentasjon

#### Bruker/Passord
| Type          | Brukernavn | Passord       |
|---------------|------------|---------------|
| Ubuntu server | alsta017   | IMKuben1337!  |
| MariaDB       | root       | IMKuben1337!  |

#### IP-adresser + hostname
| Tjeneste       | IP-adresse     | Hostname       |
|----------------|----------------|----------------|
| Ubuntu server  | 192.168.0.101  | ubuntu-server  |
| MariaDB        | 192.168.0.102  | mariadb-server |

#### Porter
| Port | Brukes av |
|------|-----------|
| 80   | NodeJS    |

#### Server-funksjon
Hoste NodeJS server og MariaDB databasen.

### Brukerveiledninger

Hvordan laste opp filer til nettsiden?

1. Du må logge inn for å laste opp filer. Dette kan du gjøre ved å trykke på "Login"-knappen.
   ![Login-tutorial1](/kode/src/images/login_tutorial1.png)
2. Her må du skrive inn brukernavn og passord hvis du har en bruker. Hvis du ikke har bruker, trykker du på "Registrer" og skriver inn ny bruker sitt brukernavn og passord.
   ![Login-tutorial2](/kode/src/images/login_tutorial2.png)
3. Når du har skrevet inn brukernavn og passord trykker du på "Login".
4. Nå kan du gå til "Last opp" siden ved å trykke på denne knappen:
   ![lastopptutorial1](/kode/src/images/lastopptutorial1.png)
5. For å laste opp en fil trykker du på "Velg fil" knappen.
6. Du vil få opp et vindu som ligner på dette. Her må du finne ut hvor filen som du skal laste opp ligger.
   ![lastopptutorial2](/kode/src/images/lastopptutorial2.png)
7. Trykk på filen du vil laste opp og deretter på "Åpne" knappen for å laste den opp til nettsiden.
   ![uploadtutorial3](/kode/src/images/uploadtutorial3.png)
8. Nå kan du bare trykke på "Last opp" knappen, og vente. Den laster opp filen.
   ![uploadtutoriallast](/kode/src/images/uploadtutoriallast.png)
9. Du vil få opp en slik melding hvis den ble lastet opp.
   ![lastetopp](/kode/src/images/lastetopp.png)

### Relevante lenker
- [Github](https://github.com/alsta017/-rsoppgave-2)
- [Opplæringsmateriale](https://github.com/alsta017/-rsoppgave-2/tree/main/dokumenter/opplæringsmateriale)

## Kartlegging av relevant lovverk
Denne nettsiden følger norsk lovgivning for personvern og datalagring, inkludert GDPR. Mer informasjon kan finnes i vedlagte dokumentasjon [her](https://github.com/alsta017/-rsoppgave-2/tree/main/dokumenter/lovverk.md).

## Risikoanalyse og tiltaksplan
En fullstendig risikoanalyse og tiltaksplan er tilgjengelig [her](https://github.com/alsta017/-rsoppgave-2/tree/main/dokumenter/risikoanalyse.md).

## Egenevaluering
### Hvilke utfordringer har du støtt på underveis med evt løsninger
Under utviklingen av prosjektet møtte jeg flere utfordringer, inkludert:
- **Autentisering**: Å implementere et sikkert login-system. Løsningen var å bruke bcrypt for passord hashing.
- **Filhåndtering**: Håndtering av store filer uten at serveren ble overbelastet. Dette ble løst ved å implementere filopplastning i mindre biter.

### Hva har du lært av arbeid med årsoppgave
Gjennom arbeidet med denne årsoppgaven har jeg lært mye om:
- Fullstack webutvikling med NodeJS og MariaDB.
- Sikkerhetsaspekter ved webutvikling.
- Prosjektstyring og dokumentasjon.

### Hvordan vurderer du selv arbeidet som er gjort
Jeg vurderer arbeidet som godt utført med tanke på funksjonalitet og sikkerhet. Brukeropplevelsen kunne imidlertid vært forbedret med mer intuitiv design og feilhåndtering.

### Hva tenker du burde vært gjort annerledes?
Hvis jeg skulle gjort noe annerledes, ville jeg:
- Brukt mer tid på frontend-design for en bedre brukeropplevelse.
- Implementert flere sikkerhetsfunksjoner fra starten av, slik som rate limiting og bedre logging.

## Kilder
- [NodeJS Documentation](https://nodejs.org/en/docs/)
- [MariaDB Documentation](https://mariadb.com/kb/en/documentation/)
- [GitHub Repository](https://github.com/alsta017/-rsoppgave-2)