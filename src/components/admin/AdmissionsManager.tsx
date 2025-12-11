import { useState } from "react";
import { useSchoolData, AdmissionRequirement } from "@/contexts/SchoolDataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdmissionsManager = () => {
  const { data, updateAdmissionRequirements } = useSchoolData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdmissionRequirement | null>(null);
  const [form, setForm] = useState({ title: "", items: "" });

  const resetForm = () => {
    setForm({ title: "", items: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: AdmissionRequirement) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      items: item.items.join("\n"),
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    updateAdmissionRequirements(data.admissionRequirements.filter(item => item.id !== id));
    toast.success("Requirement section deleted");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: AdmissionRequirement = {
      id: editingItem?.id || Date.now().toString(),
      title: form.title,
      items: form.items.split("\n").filter(item => item.trim()),
    };

    if (editingItem) {
      updateAdmissionRequirements(data.admissionRequirements.map(item => item.id === editingItem.id ? newItem : item));
      toast.success("Requirement section updated");
    } else {
      updateAdmissionRequirements([...data.admissionRequirements, newItem]);
      toast.success("Requirement section added");
    }

    setIsOpen(false);
    resetForm();
  };

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-display text-2xl">Manage Admission Requirements</CardTitle>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Requirement Section</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Section Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Required Documents"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Items (one per line)</Label>
                <Textarea
                  value={form.items}
                  onChange={(e) => setForm({ ...form, items: e.target.value })}
                  placeholder="Birth Certificate&#10;Previous School Records&#10;Passport Photos"
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full">{editingItem ? "Update" : "Add"} Section</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {data.admissionRequirements.map((req) => (
            <Card key={req.id} className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{req.title}</h3>
                    <ul className="mt-2 space-y-1">
                      {req.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(req)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(req.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdmissionsManager;
