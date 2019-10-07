<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
<xsl:template match="/">
    <html>
        <head>
            <title>Arqueosítios</title>
        </head>
        <body>
            <h1 align="center">Tabela de Arqueosítios</h1>
            <table class="w3-table" border="1">
                <th>ID</th>
                <th>Lugar</th>
                <th>Freguesia</th>
                <th>Concelho</th>
                <th>Descrição</th>
                <xsl:for-each select="ARQSITS/ARQELEM">
                    <tr>
                        <td><xsl:value-of select="IDENTI"/></td>
                        <td><xsl:value-of select="LUGAR"/></td>
                        <td><xsl:value-of select="FREGUE"/></td>
                        <td><xsl:value-of select="CONCEL"/></td>
                        <td><xsl:value-of select="DESCRI"/></td>
                    </tr>
                </xsl:for-each>
            </table>
        </body>
    </html>
</xsl:template>
</xsl:stylesheet>
