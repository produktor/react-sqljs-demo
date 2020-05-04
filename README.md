# Optikfried

# Ziel
 
Jeder Onlineanfrage nach Brillen Kaufen soll über unsere Webseite gehen.

![](images/project-schema.png)

## Slogan

Wir bringen zu jedem seiner Bedarf 

## Workflow

* Wenn der User sucht in Internet nach Brille zu kaufen soll er auf unsere Webseite kommen und nach die Brillen suchen. Er soll dann eine Liste mit alle Optiker die diese Brille haben gezeigt bekommen.(Liste oder Landkarte) er kann die nach PLZ und andere Kriterien sortieren.
* Dann kann er eine Optiker oder online Shop aus die Liste auswählen und bei denen die Brille bestellen und geliefert bekommen oder abholen. 
* Das alles soll über uns laufen als eine Vermittlung Plattform zwischen der User und Optiker. 
* Der Optiker bekommt eine Nachricht dass ein potenzieller Käufer Brille sucht und dann soll er der kauf nehmen bzw. mit anbieten und auf eine Bestätigung vom Käufer warten.
* Der Zahlungen soll auch über uns laufen und wir ziehen ein Bearbeitungsgebühr vom Betrag ab.  Der Betrag Minus Gebühr zahlen wir der Optiker.
* Auf der Website sollte auch die Möglichkeit gegeben dass der User mit der Optiker kommunizieren kann.
* Wenn die Plattform zwischen der End User  und der Optiker fertig ist gehen wir auf die Plattform zwischen der Optiker und die Lieferanten an.

### Diagram

```plantuml

Kunde -> Google : sucht nach Brille zu Kaufen
Google -> Kunde: Ergebnisse mit Optik Friend Seite

Kunde -> "Landing Page": Wählt ein Ergebniss (klick auf der Landing-Page)
"Landing Page" -> Kunde: Listet alle Optiker, die diese Brille haben 
"Landing Page" -> Kunde: Zeige die Karte mit alle Optikier in der Nähe
Kunde -> "Landing Page": Wählt ein Optiker online Shop aus die Liste
Kunde -> "Landing Page": Fühlt Bestellungsformular aus
"Landing Page" -> "Moderator": Bekommt benachrichtung über die Bestellung

```

# Links
 
* [MyDot Mockup](https://balsamiq.cloud/sxtv712/phyabhm)
* [Landing-Page](https://www.optikfriend.de/)
* [Test-Shop](https://optikfriend.silverlenses.com)
* [b2bOptic Wiki](http://wiki.b2boptic.com/en:start)
* [MyDot Eyewear - Brillen Nürnberg](https://mydoteyewear.de/)