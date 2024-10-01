import json
import requests
import time

def search_doi_and_authors(title, authors):
    query = f"{title} {' '.join(authors[:3])}"  # Use first 3 authors to improve search
    url = f"https://api.crossref.org/works?query={query}&rows=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data['message']['items']:
            item = data['message']['items'][0]
            doi = item.get('DOI')
            authors = []
            if 'author' in item:
                for author in item['author']:
                    if 'given' in author and 'family' in author:
                        authors.append(f"{author['family']}, {author['given']}")
                    elif 'name' in author:
                        authors.append(author['name'])
            return doi, authors
    return None, None

def add_dois_and_update_authors(input_file, output_file):
    with open(input_file, 'r') as f:
        bibliography = json.load(f)

    for entry in bibliography:
        if 'doi' not in entry or not entry['doi']:
            print(f"Searching DOI for: {entry['title']}")
            doi, api_authors = search_doi_and_authors(entry['title'], entry['authors'])
            if doi:
                entry['doi'] = doi
                if api_authors:
                    entry['authors'] = api_authors
                print(f"Found DOI: {doi}")
                print(f"Updated authors: {', '.join(api_authors)}")
            else:
                print("DOI not found")
            time.sleep(1)  # Be nice to the API by adding a delay between requests

    with open(output_file, 'w') as f:
        json.dump(bibliography, f, indent=2)

    print(f"Updated bibliography saved to {output_file}")

if __name__ == "__main__":
    input_file = "bibliography.json"  # Replace with your input file name
    output_file = "bibliography_updated.json"
    add_dois_and_update_authors(input_file, output_file)